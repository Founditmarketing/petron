import type { Tenant } from "@/lib/types";

/*
  Resolves a tenant's brand logo. We ship the genuine marks as committed static
  assets in /public/logos (referenced by `tenant.logo`), so logos render the same
  everywhere with no runtime token or external request. Tenants without a bundled
  logo (e.g. government clients with no clean mark) return null and the UI falls
  back to a styled wordmark.

  To add a logo: drop the file in /public/logos and set `logo` on the tenant.
  We never recreate or alter trademarked logos.
*/
export function logoSrc(tenant: Tenant): string | null {
  return tenant.logo ?? null;
}
