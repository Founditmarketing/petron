import type { Metadata } from "next";
import { getProperties } from "@/lib/content";
import { PropertiesBrowser } from "@/components/properties/PropertiesBrowser";
import { PageHero } from "@/components/site/PageHero";

export const metadata: Metadata = {
  title: "Available Properties",
  description:
    "Browse Petron's commercial real estate: office suites, warehouses, and retail centers in high-traffic Central Louisiana locations. Filter, map, and schedule a tour.",
};

export default async function PropertiesPage() {
  const properties = await getProperties();
  return (
    <>
      <PageHero
        compact
        image="/images/strip-1.png"
        alt="A Petron-developed retail strip center in a high-traffic corridor"
        eyebrow="Commercial Real Estate"
        title={<>Available <span className="text-amber">Properties</span></>}
      >
        Seven major strip centers and standalone spaces in high-traffic corridors. Filter by
        type, size, and location, view them on the map, and schedule a tour.
      </PageHero>
      <div className="pt-8">
        <PropertiesBrowser properties={properties} />
      </div>
    </>
  );
}
