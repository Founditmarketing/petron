import Link from "next/link";
import { getProjects, getProperties, getServices, getTenants } from "@/lib/content";
import { HomeMap } from "@/components/map/HomeMap";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { TenantLogo } from "@/components/site/TenantLogo";

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

  return (
    <>
      {/* HERO — control room */}
      <section className="relative flex min-h-[100dvh] flex-col overflow-hidden">
        <div className="absolute inset-0">
          <HomeMap projects={projects} animate />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-base via-base/75 to-base/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-base/85 via-transparent to-transparent" />
        <div className="bp-grid absolute inset-0" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-28 sm:px-8">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
              31.31&deg;N 92.44&deg;W · Alexandria, Louisiana
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-5xl font-display text-[clamp(2.9rem,12vw,9.5rem)] uppercase leading-[0.84] text-text">
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

      {/* MAP TEASER — editorial featured build (single map on page = the hero) */}
      <section className="relative overflow-hidden border-b border-line-soft">
        <div className="mx-auto grid max-w-7xl items-stretch gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-center">
              <SectionHeading
                eyebrow="Building across the U.S."
                title={<>National reach,<br /><span className="text-amber">proven on the map</span></>}
              />
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-text-dim">
                It is not a slogan. Every pin is a real Petron build, from Love&apos;s travel stops and
                Chevron fuel courts to Mac&apos;s Fresh Market and federal work for the Army Corps of
                Engineers. Open any project to see the scope, the client, and the photos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/projects" className="btn btn-amber">Open the live map</Link>
                <Link href={`/projects?project=${spotlight.slug}`} className="btn btn-ghost">See a case study</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <Link
              href={`/projects?project=${spotlight.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden border border-line bg-base-2"
            >
              <ParallaxImage
                src={spotlight.image}
                alt={spotlight.title}
                sizes="(max-width: 1024px) 100vw, 50vw"
                intensity={8}
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-base/20 to-transparent" />
              <span className="absolute left-5 top-5 tag bg-base/70 backdrop-blur-sm">Featured build</span>
              <span className="absolute inset-x-5 bottom-5">
                <span className="block font-mono text-[0.68rem] uppercase tracking-widest text-amber">
                  {spotlight.client} · {spotlight.city}, {spotlight.state}
                </span>
                <span className="mt-1 block font-display text-3xl uppercase leading-none text-text">{spotlight.title}</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-t border-line-soft bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading eyebrow="What we do" title={<>A little bit of <span className="text-amber">everything</span></>} />
          <div className="mt-12 grid gap-px overflow-hidden border border-line-soft bg-line-soft sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link href={`/services/${s.slug}`} className="group flex h-full flex-col bg-base-2 p-8 transition-colors hover:bg-surface">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-none text-text">{s.title}</h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-amber">{s.tagline}</p>
                  <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-text-dim">{s.summary}</p>
                  <span className="mt-6 font-cond text-sm font-semibold uppercase tracking-wider text-text-dim group-hover:text-amber">
                    Learn more →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="border-t border-line-soft">
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
      <section className="border-t border-line-soft bg-base-2">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="eyebrow mb-8 text-center">Trusted by national names</p>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {tenants.map((t) => (
              <TenantLogo key={t.name} tenant={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line-soft">
        <div className="concrete absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-24">
          <h2 className="mx-auto max-w-3xl font-display text-5xl uppercase leading-[0.92] text-text sm:text-7xl">
            Let&apos;s build something <span className="text-amber">that lasts</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-text-dim">
            Whether it&apos;s a piece of property to lease or a project to talk shop about, pick up the phone.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-amber">Start a Project</Link>
            <a href="tel:3184455685" className="btn btn-ghost">Call 318-445-5685</a>
          </div>
        </div>
      </section>
    </>
  );
}
