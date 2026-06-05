import Link from "next/link";
import Image from "next/image";
import { getProjects, getProperties, getServices, getTenants } from "@/lib/content";
import { HomeMap } from "@/components/map/HomeMap";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { TenantLogo } from "@/components/site/TenantLogo";

const mapLegend = [
  { cat: "fuel", label: "Fuel & service", color: "var(--amber)" },
  { cat: "retail", label: "Retail & commercial", color: "var(--blueprint)" },
  { cat: "government", label: "Government", color: "var(--ok)" },
];

export default async function HomePage() {
  const [projects, properties, services, tenants] = await Promise.all([
    getProjects(),
    getProperties(),
    getServices(),
    getTenants(),
  ]);

  const featured = properties.filter((p) => p.available).slice(0, 3);
  const states = new Set(projects.map((p) => p.state)).size;
  const ticker = [...projects, ...projects];
  const spotlight = projects.find((p) => p.featured) ?? projects[0];
  const [leadService, ...restServices] = services;

  return (
    <>
      {/* HERO — cinematic full-bleed build */}
      <section className="relative flex min-h-[100dvh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <div className="ken-burns absolute inset-0">
            <Image
              src="/images/fuel-canopy.png"
              alt="A Petron-built fuel canopy at dusk, wet pavement reflecting the amber lights"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/55 to-base/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/90 via-base/25 to-transparent" />
        <div className="bp-grid absolute inset-0 opacity-40" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-28 sm:px-8">
          <Reveal>
            <p className="eyebrow mb-5">
              31.31&deg;N 92.44&deg;W · Alexandria, Louisiana
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display text-[clamp(3.2rem,13vw,11rem)] uppercase leading-[0.8] text-text">
              Building on a<br />
              <span className="text-amber">firm foundation</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-dim sm:text-lg">
              General contracting, fuel-system installation, and commercial real estate. We build
              gas stations, retail centers, and government projects across the U.S. with no surprises.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects" className="btn btn-amber">Explore the Project Map</Link>
              <Link href="/properties" className="btn btn-ghost">View Available Properties</Link>
            </div>
          </Reveal>

          {/* Live stat strip */}
          <Reveal delay={0.3}>
            <div className="mt-12 grid max-w-2xl grid-cols-3 divide-x divide-line border-t border-line pt-5">
              {[
                { to: states, suffix: "+", label: "States built in" },
                { to: projects.length, suffix: "+", label: "Tracked projects" },
                { to: 7, suffix: "", label: "Strip centers" },
              ].map((s) => (
                <div key={s.label} className="px-4 first:pl-0">
                  <div className="font-display text-4xl text-amber sm:text-5xl">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-widest text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Marquee ticker */}
        <div className="relative z-10 border-y border-line-soft bg-base/80 py-3 backdrop-blur-sm">
          <div className="marquee">
            {ticker.map((p, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap px-6 font-mono text-xs uppercase tracking-widest text-text-dim">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                {p.title} · {p.city}, {p.state}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MAP FLAGSHIP — the proof, full strength */}
      <section className="border-b border-line-soft bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Building across the U.S."
              title={<>National reach,<br /><span className="text-amber">proven on the map</span></>}
            />
            <p className="max-w-[46ch] text-base leading-relaxed text-text-dim lg:pb-2">
              It is not a slogan. Every pin is a real Petron build, from Love&apos;s travel stops and
              Chevron fuel courts to federal work for the Army Corps of Engineers.
            </p>
          </div>

          <div className="relative mt-10 h-[56vh] min-h-[420px] overflow-hidden border border-line bg-base">
            <HomeMap projects={projects} animate />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/60 via-transparent to-transparent" />
            {/* functional legend */}
            <div className="pointer-events-none absolute bottom-4 left-4 flex flex-wrap items-center gap-x-5 gap-y-2 border border-line bg-base/85 px-4 py-2.5 backdrop-blur-sm">
              {mapLegend.map((l) => (
                <span key={l.cat} className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-text-dim">
                  <span className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
            <span className="pointer-events-none absolute right-4 top-4 font-mono text-[0.6rem] uppercase tracking-widest text-muted">
              {projects.length} builds tracked
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-amber">Open the live map</Link>
            <Link href={`/projects?project=${spotlight.slug}`} className="btn btn-ghost">See a case study</Link>
          </div>
        </div>
      </section>

      {/* SERVICES — photographic, asymmetric */}
      <section className="border-t border-line-soft">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading eyebrow="What we do" title={<>A little bit of <span className="text-amber">everything</span></>} />
          <div className="mt-12 grid gap-4">
            <Reveal>
              <Link
                href={`/services/${leadService.slug}`}
                className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden border border-line-soft p-7 transition-colors hover:border-line sm:min-h-[440px] sm:p-10"
              >
                <Image
                  src={leadService.image}
                  alt={leadService.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover opacity-45 transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base via-base/75 to-base/15" />
                <div className="absolute inset-0 bg-gradient-to-r from-base/70 to-transparent" />
                <div className="relative max-w-2xl">
                  <p className="font-mono text-xs uppercase tracking-widest text-amber">{leadService.tagline}</p>
                  <h3 className="mt-2 font-display text-5xl uppercase leading-[0.9] text-text sm:text-7xl">{leadService.title}</h3>
                  <p className="mt-4 max-w-[56ch] text-sm leading-relaxed text-text-dim sm:text-base">{leadService.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-cond text-sm font-semibold uppercase tracking-wider text-text group-hover:text-amber">
                    Learn more →
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {restServices.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.07}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative flex h-full min-h-[300px] flex-col justify-end overflow-hidden border border-line-soft p-6 transition-colors hover:border-line"
                  >
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover opacity-35 transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.05] group-hover:opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base via-base/80 to-base/20" />
                    <div className="relative">
                      <p className="font-mono text-[0.68rem] uppercase tracking-widest text-amber">{s.tagline}</p>
                      <h3 className="mt-2 font-display text-3xl uppercase leading-none text-text">{s.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-dim">{s.summary}</p>
                      <span className="mt-4 inline-flex items-center gap-2 font-cond text-xs font-semibold uppercase tracking-wider text-text-dim group-hover:text-amber">
                        Learn more →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="border-t border-line-soft bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Lease with Petron" title={<>Available <span className="text-amber">now</span></>} />
            <Link href="/properties" className="btn btn-ghost">All properties</Link>
          </div>
          <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
            {featured.map((p) => (
              <div key={p._id} className="min-w-[82%] snap-center sm:min-w-0">
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[0.62rem] uppercase tracking-widest text-muted sm:hidden">
            Swipe for more →
          </p>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="border-t border-line-soft">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="eyebrow mb-8 text-center">Trusted by national names</p>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {tenants.map((t) => (
              <TenantLogo key={t.name} tenant={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — full-bleed cinematic */}
      <section className="relative overflow-hidden border-t border-line">
        <Image
          src="/images/industrial.png"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/85 to-base/55" />
        <div className="concrete absolute inset-0" />
        <div className="hazard-rule absolute inset-x-0 top-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 text-center sm:px-8 sm:py-36">
          <p className="eyebrow mb-5">No surprises. Ever.</p>
          <h2 className="mx-auto max-w-4xl font-display text-6xl uppercase leading-[0.88] text-text sm:text-8xl">
            Let&apos;s build something <span className="text-amber">that lasts</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-dim sm:text-lg">
            Whether it&apos;s a piece of property to lease or a project to talk shop about, pick up the phone.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-amber">Start a Project</Link>
            <a href="tel:3184455685" className="btn btn-ghost">Call 318-445-5685</a>
          </div>
        </div>
      </section>
    </>
  );
}
