import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Petron's services: general contracting, fuel-system installation, petroleum equipment sales, and commercial leasing.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        image="/images/steel.png"
        alt="Structural steel framing on a Petron commercial build"
        eyebrow="What we do"
        title={<>Our <span className="text-amber">Services</span></>}
      >
        We have our hands in a couple of projects at once. From maintaining service stations to
        installing underground storage tanks to commercial real estate, here is the full range.
      </PageHero>

      <div className="mx-auto max-w-7xl space-y-px px-5 py-16 sm:px-8 sm:py-24">
        {services.map((s) => (
          <Reveal key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group grid items-center gap-8 border border-line-soft bg-base-2 p-6 transition-colors hover:bg-surface md:grid-cols-[220px_1fr_auto] md:p-8"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-line-soft md:aspect-square">
                <Image src={s.image} alt={s.title} fill sizes="220px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div>
                <h2 className="font-display text-4xl uppercase leading-none text-text">{s.title}</h2>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-amber">{s.tagline}</p>
                <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-text-dim">{s.summary}</p>
              </div>
              <span className="hidden font-display text-5xl text-line transition-colors group-hover:text-amber md:block">→</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
