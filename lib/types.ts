export type ProjectCategory = "fuel" | "retail" | "government";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  client: string;
  city: string;
  state: string;
  location: GeoPoint;
  year: number;
  scope: string[];
  services: string[];
  summary: string;
  image: string;
  gallery: string[];
  featured?: boolean;
}

export type PropertyType = "office" | "warehouse" | "retail";

export interface Property {
  _id: string;
  slug: string;
  title: string;
  type: PropertyType;
  sqft: number;
  city: string;
  address: string;
  location: GeoPoint;
  leaseRate: string;
  available: boolean;
  highTraffic?: boolean;
  description: string;
  amenities: string[];
  anchorTenants: string[];
  image: string;
  gallery: string[];
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  body: string[];
  highlights: string[];
  email: string;
  image: string;
}

export interface Tenant {
  name: string;
  category: string;
  /** Brand domain, used to auto-resolve a real logo via a logo provider. */
  domain?: string;
  /** Explicit logo URL or local path (e.g. /logos/att.svg). Wins over domain. */
  logo?: string;
}

export interface DepartmentContact {
  label: string;
  email: string;
  description: string;
}

export interface SiteSettings {
  phone: string;
  address: string;
  cityStateZip: string;
  hours: string;
  location: GeoPoint;
  departments: DepartmentContact[];
  tagline: string;
}
