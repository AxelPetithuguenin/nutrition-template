import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/seo";

/**
 * Fichier robots.txt.
 * `seo.noIndex: true` dans `data/site.ts` bloque toute indexation :
 * pratique pour une preproduction livree au client avant validation.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl(siteConfig);

  if (siteConfig.seo.noIndex) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
