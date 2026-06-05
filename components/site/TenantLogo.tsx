"use client";

import { useState } from "react";
import type { Tenant } from "@/lib/types";
import { logoSrc } from "@/lib/logo";

/** Shows the real brand logo when available, otherwise a styled wordmark.
 *  The image is treated to read on the dark strip; falls back on load error. */
export function TenantLogo({ tenant }: { tenant: Tenant }) {
  const src = logoSrc(tenant);
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-20 w-full items-center justify-center rounded-md border border-line-soft bg-white px-5 transition-transform duration-300 hover:-translate-y-0.5">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${tenant.name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-11 w-auto max-w-full object-contain"
        />
      ) : (
        <span className="text-center font-cond text-base font-bold uppercase leading-tight tracking-wide text-[oklch(0.28_0.02_250)]">
          {tenant.name}
        </span>
      )}
    </div>
  );
}
