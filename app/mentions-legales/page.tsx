import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { formatAddressInline } from "@/lib/contact";
import { getSiteUrl } from "@/lib/seo";
import LegalPage, { type LegalBlock } from "@/components/layout/LegalPage";

/**
 * Mentions legales.
 *
 * Le texte est entierement genere depuis `data/site.ts` (raison sociale,
 * SIRET, TVA, adresse, hebergeur) : un nouveau client obtient une page
 * conforme sans reecriture.
 *
 * A faire valider par le client avant mise en ligne : ce gabarit couvre le
 * cas general et ne remplace pas un conseil juridique.
 */
export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  const { company, contact, legal } = siteConfig;
  const siteUrl = getSiteUrl(siteConfig);
  const editor = company.legalName || company.name;

  const blocks: LegalBlock[] = [
    {
      title: "Éditeur du site",
      paragraphs: [
        `${editor}${company.profession ? `, ${company.profession}` : ""}.`,
        `Adresse : ${formatAddressInline(contact.address)}.`,
        `Téléphone : ${contact.phoneDisplay || contact.phone} — E-mail : ${contact.email}.`,
        [
          company.legalId ? `SIRET : ${company.legalId}.` : "",
          company.professionalId
            ? `${company.professionalId.label} : ${company.professionalId.value}.`
            : "",
          company.vatNumber ? `TVA intracommunautaire : ${company.vatNumber}.` : "",
        ]
          .filter(Boolean)
          .join(" "),
      ].filter(Boolean),
    },
    {
      title: "Directeur de la publication",
      paragraphs: [legal?.publicationDirector || editor],
    },
    {
      title: "Hébergement",
      paragraphs: legal?.host
        ? [
            `Le site ${siteUrl} est hébergé par ${legal.host.name}.`,
            [legal.host.address, legal.host.url].filter(Boolean).join(" — "),
          ].filter(Boolean)
        : ["L'hébergeur du site est précisé sur demande auprès de l'éditeur."],
    },
    {
      title: "Propriété intellectuelle",
      paragraphs: [
        `L'ensemble des contenus de ce site (textes, images, logos, éléments graphiques) est la propriété de ${editor}, sauf mention contraire.`,
        "Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.",
      ],
    },
    {
      title: "Responsabilité",
      paragraphs: [
        `${editor} s'efforce d'assurer l'exactitude des informations publiées sur ce site, sans garantir qu'elles soient exemptes d'erreurs ou d'omissions.`,
        "Les liens vers des sites tiers sont fournis à titre indicatif : leur contenu n'engage pas la responsabilité de l'éditeur.",
      ],
    },
    ...(legal?.extraSections ?? []),
  ];

  return (
    <LegalPage
      title="Mentions légales"
      updatedAt={legal?.updatedAt}
      blocks={blocks}
    />
  );
}
