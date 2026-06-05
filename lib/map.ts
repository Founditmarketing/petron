import type { ProjectCategory } from "@/lib/types";

/** Free, no-key dark vector basemap (CARTO dark-matter). */
export const DARK_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

export const US_VIEW = { longitude: -93.5, latitude: 33.5, zoom: 4.1 };

export const categoryMeta: Record<
  ProjectCategory,
  { label: string; short: string; colorVar: string }
> = {
  fuel: { label: "Fuel / Service Stations", short: "Fuel", colorVar: "var(--amber)" },
  retail: { label: "Retail Centers", short: "Retail", colorVar: "var(--blueprint)" },
  government: { label: "Government / Institutional", short: "Gov", colorVar: "var(--ok)" },
};
