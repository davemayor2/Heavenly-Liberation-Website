/**
 * Canonical production origin (HTTPS, apex — no `www`, no `http://`).
 * Sitemap and robots must list only URLs under this host so Google Search Console matches.
 */
export const CANONICAL_SITE_ORIGIN = "https://heavenlyliberationglobalassembly.com";

export function getCanonicalSiteUrl(): string {
  return CANONICAL_SITE_ORIGIN;
}
