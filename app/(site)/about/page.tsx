import type { Metadata } from "next";
import Link from "next/link";
import { getTenants } from "@/lib/content";
import { SectionHeading, Stat } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TenantLogo } from "@/components/site/TenantLogo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Petron is a high-quality general contractor, fuel-system installer, and real-estate developer built on relationships, trust, and no surprises.",
};

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
      <section className="relative overflow-hidden border-b border-line-soft px-5 pb-16 pt-28 sm:px-8">
        <div className="bp-grid absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow mb-3">About Petron</p>
          <h1 className="max-w-4xl font-display text-5xl uppercase leading-[0.88] text-text sm:text-8xl">
            A high standard,<br /><span className="text-amber">held since day one</span>
          </h1>
        </div>
      </section>

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

      {/* History */}
      <section className="border-y border-line-soft bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading eyebrow="The history of Petron" title={<>From Alexandria, <span className="text-amber">outward</span></>} />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { k: "Roots", v: "Petron started in Central Louisiana doing the unglamorous, essential work: sitework, concrete, and steel for businesses that needed a contractor they could trust." },
              { k: "Specialization", v: "Fuel-system installation became a signature: underground storage tanks, canopies, dispensers, and monitoring for stations across the region." },
              { k: "Reach", v: "Today Petron builds across the U.S. for national brands and government clients, while developing and leasing its own commercial real estate at home." },
            ].map((b, i) => (
              <Reveal key={b.k} delay={i * 0.08}>
                <div className="border-t border-line pt-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-amber">0{i + 1} / {b.k}</span>
                  <p className="mt-3 text-sm leading-relaxed text-text-dim">{b.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading eyebrow="Company values" title={<>What we <span className="text-amber">stand on</span></>} />
        <div className="mt-10 grid gap-px overflow-hidden border border-line-soft bg-line-soft md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="h-full bg-base p-8">
                <span className="font-display text-5xl text-amber">0{i + 1}</span>
                <h3 className="mt-3 font-display text-3xl uppercase leading-none text-text">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-dim">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Clients */}
      <section className="border-t border-line-soft bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="eyebrow mb-8 text-center">Among our clients</p>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {tenants.map((t) => (
              <TenantLogo key={t.name} tenant={t} />
            ))}
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
