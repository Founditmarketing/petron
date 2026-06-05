import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId, sanityEnabled } from "./env";

const builder = sanityEnabled ? imageUrlBuilder({ projectId, dataset }) : null;

/** Returns a CDN URL for a Sanity image source, or null when Sanity is off. */
export function urlForImage(source: Parameters<NonNullable<typeof builder>["image"]>[0]): string | null {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max").url();
}
