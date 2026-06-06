import Image from "next/image";
import { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { MaskReveal, DrawRule } from "@/components/ui/Kinetic";

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
      <div className="absolute inset-0 bg-gradient-to-t from-base via-base/50 to-base/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-base/80 via-base/20 to-transparent" />
      <div className="bp-grid absolute inset-0 opacity-40" />

      <div
        className={`relative mx-auto w-full max-w-7xl px-5 sm:px-8 ${
          compact ? "pb-10 pt-32" : "pb-14 pt-36 sm:pt-44"
        }`}
      >
        {eyebrow && (
          <div className="mb-4 flex items-center gap-4">
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
            </Reveal>
            <DrawRule delay={0.25} className="hidden w-16 sm:block" />
          </div>
        )}
        <h1
          className={`font-display uppercase leading-[0.85] text-text ${
            compact ? "text-5xl sm:text-7xl" : "text-[clamp(2.9rem,9vw,7.5rem)]"
          }`}
        >
          <MaskReveal delay={0.08}>{title}</MaskReveal>
        </h1>
        {children && (
          <Reveal delay={0.32}>
            <div className="mt-5 max-w-2xl text-base leading-relaxed text-text-dim sm:text-lg">
              {children}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
