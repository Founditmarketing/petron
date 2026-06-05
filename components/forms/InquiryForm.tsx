"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({
  source,
  propertyTitle,
  defaultMessage = "",
  compact = false,
}: {
  source: string;
  propertyTitle?: string;
  defaultMessage?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source, propertyTitle }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please call us.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-ok/40 bg-base-2 p-8 text-center" style={{ borderColor: "color-mix(in oklch, var(--ok) 40%, transparent)" }}>
        <p className="font-display text-3xl uppercase text-ok">Request received</p>
        <p className="mt-2 text-sm leading-relaxed text-text-dim">
          Thanks. Someone from Petron will reach out shortly. For anything urgent, call
          {" "}<a href="tel:3184455685" className="text-amber">318-445-5685</a>.
        </p>
      </div>
    );
  }

  const field = "w-full border border-line bg-surface px-3.5 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-muted focus:border-amber";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-muted">Name</span>
          <input name="name" required className={field} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-muted">Email</span>
          <input name="email" type="email" required className={field} placeholder="you@company.com" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-muted">Phone</span>
        <input name="phone" className={field} placeholder="(318) 000-0000" />
      </label>

      <label className="block">
        <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-muted">Message</span>
        <textarea name="message" rows={compact ? 3 : 4} required className={field} defaultValue={defaultMessage} placeholder="Tell us about your project or the space you need." />
      </label>

      {status === "error" && <p className="text-sm text-danger">{error}</p>}

      <button type="submit" disabled={status === "submitting"} className="btn btn-amber w-full justify-center disabled:opacity-60">
        {status === "submitting" ? "Sending…" : propertyTitle ? "Request a Tour" : "Send Message"}
      </button>
      <p className="text-center font-mono text-[0.6rem] uppercase tracking-widest text-muted">
        No surprises. We respond within one business day.
      </p>
    </form>
  );
}
