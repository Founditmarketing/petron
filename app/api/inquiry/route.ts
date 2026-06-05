import { NextResponse } from "next/server";
import { z } from "zod";
import { writeClient } from "@/lib/sanity/client";
import { internalEmail, confirmationEmail } from "@/lib/email/templates";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().default(""),
  message: z.string().min(1).max(4000),
  source: z.string().max(160).optional().default("Website"),
  propertyTitle: z.string().max(200).optional().default(""),
  company: z.string().max(200).optional().default(""), // honeypot
});

// Tiny in-memory rate limit (per warm instance). Good enough for spam triage.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW = 60_000;
const LIMIT = 5;

function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > WINDOW) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > LIMIT;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please fill out all required fields." }, { status: 422 });
  }

  const data = parsed.data;

  // Honeypot tripped: pretend success, drop silently.
  if (data.company) return NextResponse.json({ ok: true });

  const createdAt = new Date().toISOString();

  // 1) Store as a Sanity lead document (if configured).
  if (writeClient) {
    try {
      await writeClient.create({
        _type: "inquiry",
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: data.source,
        propertyTitle: data.propertyTitle,
        createdAt,
      });
    } catch (err) {
      console.error("Sanity inquiry write failed:", err);
    }
  }

  // 2) Send branded emails (if Resend configured): internal lead notification
  //    plus an auto-reply confirmation to the person who submitted.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const from = process.env.INQUIRY_FROM_EMAIL || "Petron Website <onboarding@resend.dev>";
    const to = process.env.INQUIRY_TO_EMAIL || "realty@petron-us.com";
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      const internal = internalEmail({ ...data, createdAt });
      const confirm = confirmationEmail({ name: data.name, propertyTitle: data.propertyTitle });

      await Promise.allSettled([
        resend.emails.send({
          from,
          to,
          replyTo: data.email,
          subject: internal.subject,
          html: internal.html,
          text: internal.text,
        }),
        resend.emails.send({
          from,
          to: data.email,
          replyTo: to,
          subject: confirm.subject,
          html: confirm.html,
          text: confirm.text,
        }),
      ]);
    } catch (err) {
      console.error("Resend email failed:", err);
    }
  }

  // Always log so submissions are never lost, even with nothing configured.
  if (!writeClient && !resendKey) {
    console.info("[inquiry]", JSON.stringify({ ...data, company: undefined, createdAt }));
  }

  return NextResponse.json({ ok: true });
}
