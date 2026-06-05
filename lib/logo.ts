import type { Tenant } from "@/lib/types";

/*
  Resolves a real brand logo URL for a tenant, in priority order:
   1. An explicit `logo` (a file you drop in /public/logos or a CMS upload).
   2. A logo provider (logo.dev) keyed by `domain`, if a token is configured.
  Returns null when nothing is available, so the UI falls back to a wordmark.

  We never recreate or alter trademarked logos. Provide officially licensed
  assets in /public/logos, or set a logo.dev token to fetch the genuine marks.
*/
export function logoSrc(tenant: Tenant): string | null {
  if (tenant.logo) return tenant.logo;

  const token = process.env.NEXT_PUBLIC_LOGODEV_TOKEN;
  if (token && tenant.domain) {
    const params = new URLSearchParams({
      token,
      // PNG preserves transparency so logos sit on a clean tile with no box.
      format: "png",
      size: "256",
      retina: "true",
      // Return 404 (not a generic monogram) when a brand is missing, so the
      // component falls back to the styled wordmark instead.
      fallback: "404",
    });
    return `https://img.logo.dev/${tenant.domain}?${params.toString()}`;
  }

  return null;
}
