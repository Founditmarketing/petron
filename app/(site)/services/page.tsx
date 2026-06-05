import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServices } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Petron's services: general contracting, fuel-system installation, petroleum equipment sales, and commercial leasing.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <section className="relative overflow-hidden border-b border-line-soft px-5 pb-12 pt-28 sm:px-8">
        <div className="bp-grid absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow mb-3">What we do</p>
          <h1 className="font-display text-5xl uppercase leading-[0.9] text-text sm:text-7xl">
            Our <span className="text-amber">Services</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-dim sm:text-base">
            We have our hands in a couple of projects at once. From maintaining service stations to
            installing underground storage tanks to commercial real estate, here is the full range.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-px px-5 py-16 sm:px-8">
        {services.map((s, i) => (
          <Reveal key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className="group grid items-center gap-8 border border-line-soft bg-base-2 p-6 transition-colors hover:bg-surface md:grid-cols-[200px_1fr_auto] md:p-8"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-line-soft md:aspect-square">
                <Image src={s.image} alt={s.title} fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h2 className="mt-2 font-display text-4xl uppercase leading-none text-text">{s.title}</h2>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-amber">{s.tagline}</p>
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
