/**
 * Resolution des liens de contact a partir de la configuration client.
 *
 * Les composants n'ecrivent jamais un numero ou une adresse en dur :
 * ils passent par ces fonctions, qui lisent `siteConfig.contact`.
 */
import type { AddressConfig, CallToAction, ContactConfig } from "@/types/site";

/** Lien `tel:` nettoye (espaces et separateurs retires). */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** Lien `mailto:`, avec sujet et corps optionnels. */
export function mailtoHref(
  email: string,
  options?: { subject?: string; body?: string },
): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);
  const query = params.toString();
  // encodeURIComponent est plus fidele que le "+" de URLSearchParams pour un mailto.
  return `mailto:${email}${query ? `?${query.replace(/\+/g, "%20")}` : ""}`;
}

/** Adresse sur une seule ligne (SEO, JSON-LD, liens de carte). */
export function formatAddressInline(address: AddressConfig): string {
  return [address.street, `${address.postalCode} ${address.city}`, address.country]
    .filter(Boolean)
    .join(", ");
}

/** Adresse sur plusieurs lignes, prete a etre affichee. */
export function formatAddressLines(address: AddressConfig): string[] {
  return [
    address.street,
    address.complement,
    `${address.postalCode} ${address.city}`,
    address.country,
  ].filter((line): line is string => Boolean(line));
}

/**
 * Lien d'itineraire : utilise `contact.mapsUrl` si fourni,
 * sinon genere une recherche Google Maps depuis l'adresse.
 */
export function directionsHref(contact: ContactConfig): string {
  if (contact.mapsUrl) return contact.mapsUrl;
  const query = encodeURIComponent(formatAddressInline(contact.address));
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/** Telephone tel qu'il doit s'afficher (retombe sur le format brut). */
export function displayPhone(contact: ContactConfig): string {
  return contact.phoneDisplay || contact.phone;
}

/**
 * Transforme le `href` d'un bouton en URL reelle.
 * Les valeurs speciales `"tel"` et `"mailto"` sont remplacees par les
 * coordonnees du client : un bouton "Appelez-nous" reste correct meme
 * apres changement de numero.
 */
export function resolveHref(href: CallToAction["href"], contact: ContactConfig): string {
  if (href === "tel") return telHref(contact.phone);
  if (href === "mailto") return mailtoHref(contact.email);
  return href;
}

/** Determine si un lien doit s'ouvrir dans un nouvel onglet. */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}
