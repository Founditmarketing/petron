import Image from "next/image";
import { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/** Cinematic full-bleed page hero with a slow Ken Burns zoom.
 *  `compact` keeps the band short so utility tools (browsers, maps) stay near the top. */
export function PageHero({
  image,
  alt,
  eyebrow,
  title,
  children,
  compact = false,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative flex flex-col justify-end overflow-hidden border-b border-line ${
        compact ? "min-h-[38vh]" : "min-h-[58vh]"
      }`}
    >
      <div className="absolute inset-0">
        <div className="ken-burns absolute inset-0">
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/65 to-base/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-base/90 via-base/25 to-transparent" />
      <div className="bp-grid absolute inset-0 opacity-40" />

      <div
        className={`relative mx-auto w-full max-w-7xl px-5 sm:px-8 ${
          compact ? "pb-10 pt-32" : "pb-14 pt-36 sm:pt-44"
        }`}
      >
        <Reveal>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1
            className={`font-display uppercase leading-[0.85] text-text ${
              compact
                ? "text-5xl sm:text-7xl"
                : "text-[clamp(2.9rem,9vw,7.5rem)]"
            }`}
          >
            {title}
          </h1>
          {children && (
            <div className="mt-5 max-w-2xl text-base leading-relaxed text-text-dim sm:text-lg">
              {children}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
