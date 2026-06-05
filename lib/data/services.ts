import type { Service } from "@/lib/types";

const img = (name: string) => `/images/${name}.png`;

export const services: Service[] = [
  {
    slug: "general-contracting",
    title: "General Contracting",
    tagline: "Remodel. Renovate. Redesign. Improve.",
    summary:
      "A licensed, trained crew that delivers cost-efficient, well-constructed projects on time, from ground-up builds to tenant improvements.",
    body: [
      "Petron has developed into a high-quality general contractor known for flexibility and professionalism. Our trained and licensed staff has earned a high level of trust and integrity across the industry.",
      "We combine deep construction experience with a team approach, delivering projects that are cost-efficient and well constructed in a timely manner. The benchmark is simple: clients have good experiences with no surprises, always.",
      "From shopping centers and medical clinics to banks and governmental projects, repeat clients generate the majority of our revenue, the clearest proof that the work holds up.",
    ],
    highlights: [
      "Ground-up commercial construction",
      "Tenant improvements & fit-outs",
      "Remodels and renovations",
      "Site civil and concrete",
      "Government and institutional work",
    ],
    email: "info@petron-us.com",
    image: img("steel"),
  },
  {
    slug: "fuel-system-installation",
    title: "Fuel System Installation",
    tagline: "Design and installation of fueling systems.",
    summary:
      "Complete fueling infrastructure for gas stations and travel centers, from underground storage tanks to canopies, dispensers, and monitoring.",
    body: [
      "Petron designs and installs fueling systems end to end. Our scope runs from underground storage tank farms and dead-men anchoring to canopies, dispensers, and underground electrical.",
      "We sequence work to keep existing sites operational wherever possible and commission every system to current compliance standards before handover.",
      "It is among the most specialized work we do, and it is built on the same foundation as everything else here: precision, safety, and no surprises.",
    ],
    highlights: [
      "Underground storage tank (UST) systems",
      "Canopies and dispenser installation",
      "Veeder-Root tank monitoring",
      "Underground electrical and conduit",
      "Compliance and commissioning",
    ],
    email: "installation@petron-us.com",
    image: img("fuel-install"),
  },
  {
    slug: "petroleum-equipment-sales",
    title: "Petroleum Equipment Sales",
    tagline: "Gilbarco, Veeder-Root, and trusted vendors.",
    summary:
      "An in-house stock of fuel-system parts from Gilbarco, Veeder-Root, and other leading vendors, keeping your equipment running.",
    body: [
      "Petron stocks in-house parts from Gilbarco, Veeder-Root, and other fuel-system vendors so operators can keep equipment online without long lead times.",
      "Whether you need dispenser components, monitoring hardware, or service parts, our parts team helps you get the right item quickly.",
      "Pair parts with our installation and service crews for a single accountable partner across your fuel operation.",
    ],
    highlights: [
      "Gilbarco dispenser parts",
      "Veeder-Root monitoring hardware",
      "In-house parts inventory",
      "Vendor sourcing",
      "Service-team support",
    ],
    email: "parts@petron-us.com",
    image: img("parts"),
  },
  {
    slug: "commercial-leasing",
    title: "Commercial Leasing",
    tagline: "Office, warehouse, retail, and outlet space.",
    summary:
      "A real-estate division with seven major strip malls and standalone properties, offering lease availability in high-traffic areas.",
    body: [
      "Petron's Real Estate Division has developed properties for lease with many national-chain companies as tenants. The portfolio includes seven major strip malls plus several stand-alone properties.",
      "We offer commercially leased office space, warehouses, and outlet malls, with lease availability concentrated in high-traffic corridors across Central Louisiana.",
      "We are on a first-name basis with our tenants. Relationships are what bring most of our customers back, and what make our centers thrive.",
    ],
    highlights: [
      "Seven major strip centers",
      "Office, warehouse, and retail",
      "High-traffic locations",
      "National-chain co-tenancy",
      "Build-to-suit options",
    ],
    email: "realty@petron-us.com",
    image: img("strip-2"),
  },
];
