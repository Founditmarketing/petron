import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PropertyMap } from "@/components/map/PropertyMap";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call Petron at 318-445-5685 or send a message. Main office, realty, parts, and fuel installation departments in Alexandria, Louisiana.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <PageHero
        image="/images/fuel-court.png"
        alt="A Petron-built fuel court lit at dusk"
        eyebrow="Come do business with us"
        title={<>Let&apos;s <span className="text-amber">talk shop</span></>}
      >
        Whether it&apos;s a property to lease or a project to discuss, reach the right team directly.
      </PageHero>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Left: details */}
        <div>
          <div className="surface-panel p-6">
            <h2 className="eyebrow mb-4">Office</h2>
            <address className="space-y-1 text-lg not-italic text-text">
              <p>{settings.address}</p>
              <p>{settings.cityStateZip}</p>
            </address>
            <a href={`tel:${settings.phone.replace(/[^0-9]/g, "")}`} className="mt-4 block font-display text-4xl text-amber">
              {settings.phone}
            </a>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
              {settings.hours} · Sat / Sun closed
            </p>
          </div>

          <h2 className="eyebrow mb-4 mt-10">Departments</h2>
          <div className="grid gap-px overflow-hidden border border-line-soft bg-line-soft sm:grid-cols-2">
            {settings.departments.map((d) => (
              <div key={d.email} className="bg-base-2 p-5">
                <h3 className="font-cond text-lg font-bold uppercase tracking-wide text-text">{d.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{d.description}</p>
                <a href={`mailto:${d.email}`} className="mt-2 block break-all font-mono text-xs text-amber link-underline">
                  {d.email}
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 h-64 overflow-hidden border border-line-soft">
            <PropertyMap
              properties={[
                {
                  _id: "office",
                  slug: "office",
                  title: "Petron HQ",
                  type: "office",
                  sqft: 0,
                  city: settings.cityStateZip,
                  address: settings.address,
                  location: settings.location,
                  leaseRate: "",
                  available: true,
                  description: "",
                  amenities: [],
                  anchorTenants: [],
                  image: "",
                  gallery: [],
                },
              ]}
              center={settings.location}
              zoom={13}
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Right: form */}
        <div className="surface-panel p-7 lg:p-9">
          <h2 className="font-display text-3xl uppercase text-text">Send a message</h2>
          <p className="mt-1 mb-6 text-sm text-muted">We respond within one business day. No surprises.</p>
          <InquiryForm source="Contact page" />
        </div>
      </div>
    </>
  );
}
