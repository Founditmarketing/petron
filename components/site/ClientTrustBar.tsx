import type { Tenant } from "@/lib/types";
import { TenantLogo } from "./TenantLogo";

function joinNames(names: string[]): string {
  if (names.length <= 1) return names[0] ?? "";
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

export function ClientTrustBar({
  tenants,
  heading,
}: {
  tenants: Tenant[];
  heading: string;
}) {
  const withLogos = tenants.filter((t) => t.logo);
  const wordmarks = tenants.filter((t) => !t.logo);

  return (
    <section className="border-t border-line-soft bg-base-2">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="mb-10 text-center font-cond text-sm font-semibold uppercase tracking-[0.16em] text-muted">
          {heading}
        </p>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {withLogos.map((t) => (
            <div
              key={t.name}
              className="flex h-[84px] items-center justify-center rounded-lg bg-white/[0.03] px-4 ring-1 ring-white/[0.06] transition-colors duration-300 hover:bg-white/[0.06]"
            >
              <TenantLogo tenant={t} />
            </div>
          ))}
        </div>

        {wordmarks.length > 0 && (
          <p className="mx-auto mt-7 max-w-2xl text-center text-sm leading-relaxed text-muted">
            Plus federal and state work for the{" "}
            <span className="text-text-dim">
              {joinNames(wordmarks.map((t) => t.name))}
            </span>
            .
          </p>
        )}
      </div>
    </section>
  );
}
