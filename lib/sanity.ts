import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/**
 * Public read client. `null` when env is missing (e.g. Vercel build before env vars are added).
 * Always check `if (client)` before calling `fetch`.
 */
export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

/** Authenticated client for drafts / mutations — same nullability as `client` */
export const previewClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/** Generates a Sanity CDN image URL. Requires `NEXT_PUBLIC_SANITY_PROJECT_ID`. */
export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Sanity urlFor: NEXT_PUBLIC_SANITY_PROJECT_ID is not set");
  }
  return builder.image(source);
}

/**
 * Formats a Sanity date/datetime ISO string into a readable display string.
 * e.g. "2026-06-06T18:30:00.000Z" → "June 6, 2026"
 */
export function formatSanityDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
