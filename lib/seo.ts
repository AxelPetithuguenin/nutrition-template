/**
 * Metadonnees et donnees structurees, generees depuis `data/site.ts`.
 *
 * Aucun texte SEO n'est ecrit dans les pages : tout vient de la configuration,
 * ce qui garantit qu'un nouveau client herite d'un referencement complet
 * (titre, description, Open Graph, JSON-LD LocalBusiness + FAQ) sans code.
 */
import type { Metadata } from "next";
import { formatAddressInline } from "@/lib/contact";
import { toOpeningHoursSpecification } from "@/lib/hours";
import type { SiteConfig } from "@/types/site";

/**
 * URL publique du site.
 * `NEXT_PUBLIC_SITE_URL` (variable d'environnement) est prioritaire, ce qui
 * permet d'avoir une preproduction et une production sans modifier le code.
 */
export function getSiteUrl(config: SiteConfig): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || config.seo.siteUrl;
  return url.replace(/\/$/, "");
}

/** Construit l'objet `metadata` consomme par le layout Next.js. */
export function buildMetadata(config: SiteConfig): Metadata {
  const { company, seo, images } = config;
  const siteUrl = getSiteUrl(config);
  const title = seo.title || `${company.name} — ${company.tagline}`;
  const description = seo.description || company.description;
  const ogImage = images.ogImage;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      // Les pages internes s'affichent en "Titre de page | Nom du client".
      template: `%s | ${company.name}`,
    },
    description,
    keywords: seo.keywords,
    applicationName: company.name,
    authors: [{ name: company.legalName || company.name }],
    creator: company.legalName || company.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: company.name,
      title,
      description,
      url: siteUrl,
      locale: seo.locale,
      images: ogImage
        ? [
            {
              url: ogImage.src,
              width: ogImage.width ?? 1200,
              height: ogImage.height ?? 630,
              alt: ogImage.alt || company.name,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage.src] : undefined,
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    verification: seo.googleSiteVerification
      ? { google: seo.googleSiteVerification }
      : undefined,
    icons: {
      icon: "/favicon.svg",
      apple: "/favicon.svg",
    },
  };
}

/**
 * Donnees structurees JSON-LD :
 *  - `LocalBusiness` (coordonnees, horaires, note moyenne) pour le SEO local,
 *  - `FAQPage` pour l'affichage des questions directement dans Google.
 */
export function buildJsonLd(config: SiteConfig): Record<string, unknown>[] {
  const { company, contact, social, seo, sections } = config;
  const siteUrl = getSiteUrl(config);
  const hours = sections.hours;
  const testimonials = sections.testimonials;

  const business: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": seo.businessType || "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: company.name,
    legalName: company.legalName,
    description: seo.description || company.description,
    url: siteUrl,
    telephone: contact.phone,
    email: contact.email,
    image: config.images.ogImage ? `${siteUrl}${config.images.ogImage.src}` : undefined,
    priceRange: seo.priceRange,
    foundingDate: company.foundedYear ? String(company.foundedYear) : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      addressCountry: contact.address.countryCode || contact.address.country,
    },
    areaServed: contact.address.city,
    sameAs: social.length > 0 ? social.map((link) => link.href) : undefined,
  };

  if (contact.address.coordinates) {
    business.geo = {
      "@type": "GeoCoordinates",
      latitude: contact.address.coordinates.latitude,
      longitude: contact.address.coordinates.longitude,
    };
  }

  if (hours.enabled && hours.schedule.length > 0) {
    business.openingHoursSpecification = toOpeningHoursSpecification(hours.schedule);
  }

  /*
   * Note moyenne : on privilegie la valeur declaree dans `seo.aggregateRating`
   * (avis verifies, source externe). A defaut, on retombe sur la section
   * temoignages lorsqu'elle est affichee — jamais sur des avis masques, que
   * Google considererait comme non verifiables.
   */
  if (seo.aggregateRating) {
    business.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: seo.aggregateRating.value,
      reviewCount: seo.aggregateRating.count,
      bestRating: 5,
    };
  } else if (
    testimonials.enabled &&
    testimonials.averageRating &&
    testimonials.items.length > 0
  ) {
    business.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: testimonials.averageRating,
      reviewCount: testimonials.items.length,
      bestRating: 5,
    };
  }

  if (sections.services.enabled && sections.services.items.length > 0) {
    business.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: sections.services.title,
      itemListElement: sections.services.items.map((service) => ({
        "@type": "Offer",
        name: service.title,
        description: service.description,
        price: service.price,
      })),
    };
  }

  const documents: Record<string, unknown>[] = [business];

  if (sections.faq.enabled && sections.faq.items.length > 0) {
    documents.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: sections.faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return documents;
}

/** Adresse formatee, exposee ici pour eviter un import supplementaire. */
export { formatAddressInline };
