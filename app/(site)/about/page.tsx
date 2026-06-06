import type { Metadata } from "next";
import Link from "next/link";
import { getTenants } from "@/lib/content";
import { SectionHeading, Stat } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TenantLogo } from "@/components/site/TenantLogo";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Petron is a high-quality general contractor, fuel-system installer, and real-estate developer built on relationships, trust, and no surprises.",
};

const history = [
  { k: "Roots", v: "Petron started in Central Louisiana doing the unglamorous, essential work: sitework, concrete, and steel for businesses that needed a contractor they could trust." },
  { k: "Specialization", v: "Fuel-system installation became a signature: underground storage tanks, canopies, dispensers, and monitoring for stations across the region." },
  { k: "Reach", v: "Today Petron builds across the U.S. for national brands and government clients, while developing and leasing its own commercial real estate at home." },
];

const values = [
  {
    title: "Relationships",
    body: "We are on a first-name basis with our customers. Our need to connect is what gives us our business, and what makes most of our customer base return clients.",
  },
  {
    title: "No surprises",
    body: "The benchmark for Petron is for clients to have good experiences with no surprises, always. We say what we will do, then we do it.",
  },
  {
    title: "Built to last",
    body: "Every project, big or small, gets our utmost attention. We want clients satisfied and happy with work that holds up. That is where our passion comes from.",
  },
];

export default async function AboutPage() {
  const tenants = await getTenants();
  return (
    <>
      <PageHero
        image="/images/concrete.png"
        alt="Freshly placed concrete and rebar on a Petron jobsite"
        eyebrow="About Petron"
        title={<>A high standard,<br /><span className="text-amber">held since day one</span></>}
      />

      {/* Narrative */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div className="max-w-[66ch] space-y-5 text-lg leading-relaxed text-text-dim">
              <p>
                PETRON, L.L.C. has developed into a high-quality general contractor known for its
                flexibility and professionalism. A trained and licensed staff has created a high level
                of trust and integrity in the industry.
              </p>
              <p>
                We combine deep experience in construction with a team approach, delivering projects
                that are cost-efficient and well constructed in a timely manner. Repeat clients
                generate the majority of our revenue, the clearest proof that the work holds up.
              </p>
              <p>
                Among our clients are shopping centers, medical clinics, banks, and governmental
                projects including the Army Corps of Engineers and the State of Louisiana. We are
                proud to list AT&amp;T, Procter &amp; Gamble, and Love&apos;s Travel Stops among the names
                we have built for.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-8 lg:pt-2">
              <Stat value="40+" label="Years in business" />
              <Stat value="100%" label="Licensed & bonded" />
              <Stat value="7" label="Strip centers" />
              <Stat value="No" label="Surprises" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* History — connected timeline (chronological progression) */}
      <section className="border-y border-line-soft bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading eyebrow="The history of Petron" title={<>From Alexandria, <span className="text-amber">outward</span></>} />

          {/* Desktop: horizontal timeline */}
          <ol className="relative mt-16 hidden grid-cols-3 gap-x-10 md:grid">
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
            {history.map((b, i) => (
              <Reveal key={b.k} delay={i * 0.1}>
                <li className="relative pt-10">
                  <span aria-hidden className="absolute left-0 top-0 h-3 w-3 -translate-y-1/2 rotate-45 bg-amber" />
                  <h3 className="font-display text-3xl uppercase leading-none text-text">{b.k}</h3>
                  <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-text-dim">{b.v}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          {/* Mobile: vertical timeline */}
          <ol className="relative mt-12 space-y-9 border-l border-line pl-7 md:hidden">
            {history.map((b) => (
              <li key={b.k} className="relative">
                <span aria-hidden className="absolute -left-[33px] top-1 h-2.5 w-2.5 rotate-45 bg-amber" />
                <h3 className="font-display text-3xl uppercase leading-none text-text">{b.k}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-dim">{b.v}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values — editorial split list */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading title={<>What we <span className="text-amber">stand on</span></>} />
        <dl className="mt-12 divide-y divide-line-soft border-t border-line-soft">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07}>
              <div className="grid gap-3 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12">
                <dt className="font-display text-3xl uppercase leading-none text-amber sm:text-4xl">{v.title}</dt>
                <dd className="max-w-[62ch] text-base leading-relaxed text-text-dim">{v.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Clients — single trust band */}
      <section className="border-t border-line-soft bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="mb-8 text-center font-cond text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            Among our clients
          </p>
          <div className="overflow-hidden rounded-md border border-line-soft bg-[oklch(0.93_0.004_250)]">
            <div className="grid grid-cols-2 divide-x divide-y divide-black/[0.07] sm:grid-cols-4 lg:grid-cols-8 lg:divide-y-0">
              {tenants.map((t) => (
                <TenantLogo key={t.name} tenant={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-line-soft">
        <div className="concrete absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 text-center sm:px-8">
          <h2 className="font-display text-4xl uppercase text-text sm:text-6xl">Come do business with us</h2>
          <Link href="/contact" className="btn btn-amber mt-8">Start a Project</Link>
        </div>
      </section>
    </>
  );
}
