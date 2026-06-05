import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getServices, getService } from "@/lib/content";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.summary };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  return (
    <article className="pt-16">
      <section className="relative overflow-hidden border-b border-line-soft">
        <div className="absolute inset-0">
          <ParallaxImage src={service.image} alt={service.title} sizes="100vw" className="opacity-30" intensity={12} priority />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/80 to-base/40" />
        </div>
        <div className="bp-grid absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-20 sm:px-8">
          <Link href="/services" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-amber">
            ← All services
          </Link>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.9] text-text sm:text-7xl">{service.title}</h1>
          <p className="mt-3 font-mono text-sm uppercase tracking-wider text-amber">{service.tagline}</p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_340px]">
        <div className="max-w-[68ch] space-y-5">
          {service.body.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-text-dim">{p}</p>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="surface-panel p-6">
            <h2 className="eyebrow mb-4">Capabilities</h2>
            <ul className="space-y-3">
              {service.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-text-dim">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-panel mt-5 p-6">
            <h2 className="font-display text-2xl uppercase text-text">Talk to this team</h2>
            <p className="mt-2 text-sm text-muted">Direct line for {service.title.toLowerCase()}.</p>
            <a href={`mailto:${service.email}`} className="mt-4 block break-all font-mono text-sm text-amber link-underline">
              {service.email}
            </a>
            <Link href="/contact" className="btn btn-amber mt-5 w-full justify-center">Start a Project</Link>
          </div>
        </aside>
      </div>
    </article>
  );
}
