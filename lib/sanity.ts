import { createClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true, // CDN for fast cached reads
});

/** Used only for authenticated mutations / draft previews */
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = createImageUrlBuilder(client);

/** Helper: generates a Sanity CDN image URL from a Sanity image reference */
export function urlFor(source: SanityImageSource) {
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
