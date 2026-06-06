import type { SiteSettings, Tenant } from "@/lib/types";

export const siteSettings: SiteSettings = {
  phone: "318-445-5685",
  address: "1600 Harris Street",
  cityStateZip: "Alexandria, LA 71301",
  hours: "Mon - Fri: 7am - 5pm",
  location: { lat: 31.3069, lng: -92.4498 },
  tagline: "Building on a firm foundation.",
  departments: [
    {
      label: "Main Office",
      email: "info@petron-us.com",
      description: "General inquiries, contracting, and everything else.",
    },
    {
      label: "Realty",
      email: "realty@petron-us.com",
      description: "Leasing, available properties, and tours.",
    },
    {
      label: "Parts",
      email: "parts@petron-us.com",
      description: "Gilbarco, Veeder-Root, and fuel-system parts.",
    },
    {
      label: "Fuel Installation",
      email: "installation@petron-us.com",
      description: "Fueling system design and installation.",
    },
  ],
};

export const tenants: Tenant[] = [
  { name: "Love's Travel Stops", category: "Fuel", domain: "loves.com", logo: "/logos/clean/loves.png" },
  { name: "Chevron", category: "Fuel", domain: "chevron.com", logo: "/logos/clean/chevron.png" },
  { name: "Mac's Fresh Market", category: "Grocery", domain: "macsfreshmarket.com", logo: "/logos/clean/macs.png" },
  { name: "FireHouse Subs", category: "Restaurant", domain: "firehousesubs.com", logo: "/logos/clean/firehouse.png" },
  { name: "AT&T", category: "Telecom", domain: "att.com", logo: "/logos/clean/att.png" },
  { name: "Procter & Gamble", category: "Industrial", domain: "pg.com", logo: "/logos/clean/pg.png" },
  // Government clients have no clean brand mark; they render as styled wordmarks.
  { name: "US Army Corps of Engineers", category: "Government", domain: "usace.army.mil" },
  { name: "State of Louisiana", category: "Government", domain: "louisiana.gov" },
];
