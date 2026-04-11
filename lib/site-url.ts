/**
 * Canonical origin for sitemaps, metadataBase, and absolute links.
 *
 * Google Search Console requires every <loc> in your sitemap to use the same
 * host as the property you verified (including www vs non-www). Preview
 * deployment URLs (…-xyz123.vercel.app) must not be used if your property is
 * your custom domain.
 *
 * In Vercel → Project → Settings → Environment Variables (Production), set:
 *   NEXT_PUBLIC_SITE_URL=https://heavenlyliberation.org
 * Use the exact URL you added as a property in Search Console (apex vs www must match).
 */

function normalizeOrigin(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    let origin = new URL(withProtocol).origin;
    if (origin === "https://www.heavenlyliberation.org") {
      origin = "https://heavenlyliberation.org";
    }
    return origin;
  } catch {
    return null;
  }
}

export function getCanonicalSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const explicit = fromEnv ? normalizeOrigin(fromEnv) : null;
  if (explicit) return explicit;

  // Production on Vercel: stable hostname (not per-branch preview URLs).
  if (process.env.VERCEL_ENV === "production") {
    const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
    if (prodHost) {
      const o = normalizeOrigin(prodHost);
      if (o) return o;
    }
    const v = process.env.VERCEL_URL?.trim();
    if (v) {
      const o = normalizeOrigin(v);
      if (o) return o;
    }
  }

  // Preview / local: match the deployment so URLs stay self-consistent (for testing only).
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const o = normalizeOrigin(vercel);
    if (o) return o;
  }

  return "http://localhost:3000";
}
