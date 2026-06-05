import type { MetadataRoute } from "next";
import { getProjects, getProperties, getServices } from "@/lib/content";

const BASE = "https://petron-us.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, services] = await Promise.all([getProperties(), getServices()]);
  await getProjects();

  const staticRoutes = ["", "/projects", "/properties", "/services", "/about", "/contact"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));

  const propertyRoutes = properties.map((p) => ({
    url: `${BASE}/properties/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...serviceRoutes];
}
