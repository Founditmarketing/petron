"use client";

import { useState } from "react";
import type { Tenant } from "@/lib/types";
import { logoSrc } from "@/lib/logo";

/** A single full-color client mark sitting on the white trust panel. */
export function TenantLogo({ tenant }: { tenant: Tenant }) {
  const src = logoSrc(tenant);
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${tenant.name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="max-h-9 w-auto max-w-[120px] object-contain transition-transform duration-300 hover:scale-[1.05]"
    />
  );
}
