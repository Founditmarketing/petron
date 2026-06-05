import type { Metadata } from "next";
import { getProperties } from "@/lib/content";
import { PropertiesBrowser } from "@/components/properties/PropertiesBrowser";

export const metadata: Metadata = {
  title: "Available Properties — Office, Warehouse & Retail",
  description:
    "Browse Petron's commercial real estate: office suites, warehouses, and retail centers in high-traffic Central Louisiana locations. Filter, map, and schedule a tour.",
};

export default async function PropertiesPage() {
  const properties = await getProperties();
  return (
    <>
      <section className="relative overflow-hidden border-b border-line-soft px-5 pb-10 pt-28 sm:px-8">
        <div className="bp-grid absolute inset-0" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow mb-3">Commercial Real Estate</p>
          <h1 className="font-display text-5xl uppercase leading-[0.9] text-text sm:text-7xl">
            Available <span className="text-amber">Properties</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-dim sm:text-base">
            Seven major strip centers and standalone spaces in high-traffic corridors. Filter by
            type, size, and location, view them on the map, and schedule a tour.
          </p>
        </div>
      </section>
      <div className="pt-8">
        <PropertiesBrowser properties={properties} />
      </div>
    </>
  );
}
