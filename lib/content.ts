import { client } from "@/lib/sanity/client";
import { sanityEnabled } from "@/lib/sanity/env";
import { projects as seedProjects } from "@/lib/data/projects";
import { properties as seedProperties } from "@/lib/data/properties";
import { services as seedServices } from "@/lib/data/services";
import { siteSettings as seedSettings, tenants as seedTenants } from "@/lib/data/site";
import type { Project, Property, Service, SiteSettings, Tenant } from "@/lib/types";

/*
  Content layer. When Sanity is configured (NEXT_PUBLIC_SANITY_PROJECT_ID set),
  data is read from the Content Lake; otherwise everything falls back to local
  seed data so the site is fully functional with zero external setup.
*/

async function fromSanity<T>(query: string, fallback: T): Promise<T> {
  if (!sanityEnabled || !client) return fallback;
  try {
    const res = await client.fetch<T>(query);
    if (Array.isArray(res) && res.length === 0) return fallback;
    return res ?? fallback;
  } catch {
    return fallback;
  }
}

export async function getProjects(): Promise<Project[]> {
  return fromSanity<Project[]>(`*[_type == "project"] | order(year desc)`, seedProjects);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

export async function getProperties(): Promise<Property[]> {
  return fromSanity<Property[]>(`*[_type == "property"]`, seedProperties);
}

export async function getProperty(slug: string): Promise<Property | undefined> {
  const all = await getProperties();
  return all.find((p) => p.slug === slug);
}

export async function getServices(): Promise<Service[]> {
  return fromSanity<Service[]>(`*[_type == "service"]`, seedServices);
}

export async function getService(slug: string): Promise<Service | undefined> {
  const all = await getServices();
  return all.find((s) => s.slug === slug);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fromSanity<SiteSettings>(`*[_type == "siteSettings"][0]`, seedSettings);
}

export async function getTenants(): Promise<Tenant[]> {
  return fromSanity<Tenant[]>(`*[_type == "tenant"]`, seedTenants);
}
