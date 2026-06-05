export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

/** Sanity is "on" only when a project id is configured. Otherwise the site
 *  runs entirely on local seed data, so it looks great with zero setup. */
export const sanityEnabled = projectId.length > 0;
