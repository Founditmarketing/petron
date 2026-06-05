import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProperties, getProperty } from "@/lib/content";
import { Gallery } from "@/components/ui/Gallery";
import { Specs } from "@/components/ui/Specs";
import { PropertyMap } from "@/components/map/PropertyMap";
import { InquiryForm } from "@/components/forms/InquiryForm";

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.title} — ${property.city}`,
    description: property.description,
  };
}

const typeLabel = { office: "Office", warehouse: "Warehouse", retail: "Retail" } as const;

export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getProperty(slug);
  if (!property) notFound();

  return (
    <article className="pt-16">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <Link href="/properties" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-amber">
          ← All properties
        </Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="tag">{typeLabel[property.type]}</span>
              <span
                className="tag"
                style={{
                  color: property.available ? "var(--ok)" : "var(--muted)",
                  borderColor: property.available ? "var(--ok)" : undefined,
                }}
              >
                {property.available ? "Available" : "Leased"}
              </span>
              {property.highTraffic && <span className="tag" style={{ borderColor: "var(--amber)", color: "var(--amber)" }}>High Traffic</span>}
            </div>
            <h1 className="font-display text-5xl uppercase leading-[0.9] text-text sm:text-7xl">{property.title}</h1>
            <p className="mt-2 font-mono text-sm tracking-wider text-muted">{property.address}</p>
          </div>
          <div className="text-right">
            <div className="font-display text-4xl text-amber">{property.sqft.toLocaleString()}</div>
            <div className="font-mono text-[0.7rem] uppercase tracking-widest text-muted">square feet</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Gallery images={property.gallery} alt={property.title} />
      </div>

      <div className="mx-auto mt-14 grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[1fr_400px]">
        <div>
          <h2 className="eyebrow mb-3">Overview</h2>
          <p className="max-w-[68ch] text-lg leading-relaxed text-text-dim">{property.description}</p>

          {property.amenities.length > 0 && (
            <>
              <h2 className="eyebrow mb-4 mt-12">Features</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {property.amenities.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 border-t border-line-soft pt-3 text-sm text-text-dim">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                    {a}
                  </li>
                ))}
              </ul>
            </>
          )}

          {property.anchorTenants.length > 0 && (
            <>
              <h2 className="eyebrow mb-4 mt-12">Co-tenancy</h2>
              <div className="flex flex-wrap gap-2">
                {property.anchorTenants.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </>
          )}

          <h2 className="eyebrow mb-4 mt-12">Location</h2>
          <PropertyMap
            properties={[property]}
            center={property.location}
            zoom={13}
            className="h-[360px] overflow-hidden border border-line-soft"
          />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="surface-panel p-6">
            <Specs
              rows={[
                { label: "Type", value: typeLabel[property.type] },
                { label: "Size", value: `${property.sqft.toLocaleString()} sqft` },
                { label: "Lease rate", value: property.leaseRate },
                { label: "Location", value: property.city },
                { label: "Status", value: property.available ? "Available" : "Leased" },
              ]}
            />
          </div>

          <div id="tour" className="surface-panel mt-5 scroll-mt-20 p-6">
            <h2 className="font-display text-2xl uppercase text-text">Schedule a Tour</h2>
            <p className="mt-1 mb-5 text-sm text-muted">
              {property.available
                ? "See the space in person. Tell us a time that works."
                : "Currently leased. Join the waitlist for this center."}
            </p>
            <InquiryForm
              source={`Property: ${property.title}`}
              propertyTitle={property.title}
              compact
              defaultMessage={`I'd like to schedule a tour of ${property.title} (${property.city}).`}
            />
          </div>
        </aside>
      </div>

      {/* Mobile sticky action bar — sits above the bottom tab bar */}
      <div className="fixed inset-x-0 bottom-[calc(3.6rem+env(safe-area-inset-bottom,0px))] z-40 flex items-center gap-4 border-y border-line bg-base/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <div className="min-w-0">
          <div className="truncate font-mono text-[0.62rem] uppercase tracking-widest text-muted">{property.leaseRate || "Inquire"}</div>
          <div className="font-cond font-semibold text-text">{property.sqft.toLocaleString()} sqft</div>
        </div>
        <a href="#tour" className="btn btn-amber ml-auto">
          {property.available ? "Schedule a Tour" : "Join Waitlist"}
        </a>
      </div>
      <div className="h-36 lg:hidden" aria-hidden="true" />
    </article>
  );
}
