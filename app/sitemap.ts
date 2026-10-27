import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/seo";

/**
 * Plan du site.
 * Les pages legales sont incluses uniquement si le pied de page y renvoie,
 * afin qu'un client sans page legale n'obtienne pas d'URL morte.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl(siteConfig);
  const lastModified = new Date();

  const legalPages = (siteConfig.footer.legalLinks ?? [])
    .filter((link) => link.href.startsWith("/"))
    .map((link) => ({
      url: `${baseUrl}${link.href}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...legalPages,
  ];
}
