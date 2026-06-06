"use client";

import { useState } from "react";
import type { Tenant } from "@/lib/types";
import { logoSrc } from "@/lib/logo";

/** A single client mark inside the trust band. Greyscale at rest, true color on
 *  hover, so the row reads as credibility rather than a grid of placeholder cards. */
export function TenantLogo({ tenant }: { tenant: Tenant }) {
  const src = logoSrc(tenant);
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-20 items-center justify-center px-5">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${tenant.name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-10 w-auto max-w-[130px] object-contain opacity-65 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="text-center font-cond text-sm font-bold uppercase leading-tight tracking-wide text-[oklch(0.42_0.02_250)] transition-colors duration-300 hover:text-[oklch(0.28_0.02_250)]">
          {tenant.name}
        </span>
      )}
    </div>
  );
}
