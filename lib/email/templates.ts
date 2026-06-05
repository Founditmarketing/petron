/*
  Branded transactional email templates. Email clients have poor support for
  modern CSS (no oklch, limited flexbox), so these use table layout and hex.
*/

const BASE = "#15171c";
const PANEL = "#1c1f26";
const AMBER = "#f0a020";
const TEXT = "#eef0f3";
const MUTED = "#9aa0ab";
const LINE = "#2c3038";

export interface InquiryData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source?: string;
  propertyTitle?: string;
  createdAt: string;
}

function shell(inner: string) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${BASE};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BASE};padding:32px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:92%;background:${PANEL};border:1px solid ${LINE};">
        <tr><td style="height:6px;background:repeating-linear-gradient(-45deg,${AMBER} 0 14px,#2a2316 14px 28px);"></td></tr>
        <tr><td style="padding:32px 36px;font-family:Arial,Helvetica,sans-serif;">
          <div style="font-size:26px;font-weight:800;letter-spacing:1px;color:${TEXT};text-transform:uppercase;">PETR<span style="color:${AMBER};">O</span>N</div>
          <div style="font-size:11px;letter-spacing:3px;color:${MUTED};text-transform:uppercase;margin-top:4px;">Building on a firm foundation</div>
          ${inner}
        </td></tr>
        <tr><td style="padding:20px 36px;border-top:1px solid ${LINE};font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${MUTED};">
          Petron, L.L.C. &middot; 1600 Harris Street, Alexandria, LA 71301 &middot; 318-445-5685
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${LINE};font-family:monospace;font-size:11px;letter-spacing:1px;color:${MUTED};text-transform:uppercase;width:120px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${LINE};font-family:Arial,Helvetica,sans-serif;font-size:14px;color:${TEXT};">${value}</td>
  </tr>`;
}

export function internalEmail(d: InquiryData) {
  const subject = `New inquiry: ${d.source || "Website"}${d.propertyTitle ? `: ${d.propertyTitle}` : ""}`;
  const inner = `
    <h1 style="font-size:22px;color:${TEXT};text-transform:uppercase;margin:28px 0 4px;">New lead received</h1>
    <p style="font-size:13px;color:${MUTED};margin:0 0 20px;">A new inquiry just came in from the website.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", esc(d.name))}
      ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:${AMBER};text-decoration:none;">${esc(d.email)}</a>`)}
      ${row("Phone", esc(d.phone || "Not provided"))}
      ${row("Source", esc(d.source || "Website"))}
      ${d.propertyTitle ? row("Property", esc(d.propertyTitle)) : ""}
      ${row("Received", new Date(d.createdAt).toLocaleString("en-US"))}
    </table>
    <div style="margin-top:18px;font-family:monospace;font-size:11px;letter-spacing:1px;color:${MUTED};text-transform:uppercase;">Message</div>
    <p style="font-size:14px;color:${TEXT};line-height:1.6;margin:8px 0 24px;white-space:pre-wrap;">${esc(d.message)}</p>
    <a href="mailto:${esc(d.email)}" style="display:inline-block;background:${AMBER};color:#1a1407;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;text-decoration:none;padding:12px 22px;">Reply to ${esc(d.name)}</a>`;
  const text = [
    `New inquiry: ${d.source || "Website"}`,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "Not provided"}`,
    d.propertyTitle ? `Property: ${d.propertyTitle}` : "",
    "",
    d.message,
  ]
    .filter(Boolean)
    .join("\n");
  return { subject, html: shell(inner), text };
}

export function confirmationEmail(d: Pick<InquiryData, "name" | "propertyTitle">) {
  const subject = "We received your message | Petron";
  const inner = `
    <h1 style="font-size:22px;color:${TEXT};text-transform:uppercase;margin:28px 0 4px;">Thanks, ${esc(firstName(d.name))}.</h1>
    <p style="font-size:14px;color:#c4c9d2;line-height:1.7;margin:0 0 18px;">
      We received your ${d.propertyTitle ? `tour request for <strong style="color:${TEXT};">${esc(d.propertyTitle)}</strong>` : "message"} and a member of our team will be in touch within one business day.
    </p>
    <p style="font-size:14px;color:#c4c9d2;line-height:1.7;margin:0 0 24px;">
      Need something sooner? Call us at <a href="tel:3184455685" style="color:${AMBER};text-decoration:none;">318-445-5685</a>, Monday through Friday, 7am to 5pm.
    </p>
    <div style="border-left:0;background:${BASE};border:1px solid ${LINE};padding:16px 18px;">
      <div style="font-family:monospace;font-size:11px;letter-spacing:2px;color:${AMBER};text-transform:uppercase;">The Petron benchmark</div>
      <div style="font-size:14px;color:${TEXT};margin-top:6px;">Good experiences with no surprises. Always.</div>
    </div>`;
  const text = `Thanks, ${firstName(d.name)}.

We received your ${d.propertyTitle ? `tour request for ${d.propertyTitle}` : "message"} and will be in touch within one business day.

Need something sooner? Call 318-445-5685 (Mon-Fri, 7am-5pm).

Petron, L.L.C. Building on a firm foundation.`;
  return { subject, html: shell(inner), text };
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || name;
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
