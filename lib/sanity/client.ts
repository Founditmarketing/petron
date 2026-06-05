import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityEnabled } from "./env";

export const client = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;

/** Write client for inquiries. Requires a server-only token. */
export const writeClient =
  sanityEnabled && process.env.SANITY_WRITE_TOKEN
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        token: process.env.SANITY_WRITE_TOKEN,
        useCdn: false,
      })
    : null;
