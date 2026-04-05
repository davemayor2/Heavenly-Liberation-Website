import type { MetadataRoute } from "next";
import { getCanonicalSiteUrl } from "@/lib/site-url";

/** Allows all crawlers; declares sitemap using the same canonical host as Search Console. */
export default function robots(): MetadataRoute.Robots {
  const base = getCanonicalSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
