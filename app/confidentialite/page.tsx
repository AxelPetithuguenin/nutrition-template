import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import LegalPage, { type LegalBlock } from "@/components/layout/LegalPage";

/**
 * Politique de confidentialite (RGPD).
 *
 * Gabarit generique adapte a un site vitrine avec formulaire de contact,
 * alimente par `data/site.ts`. A relire avec le client si le site collecte
 * d'autres donnees (compte utilisateur, paiement, statistiques avancees).
 */
export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
};

export default function ConfidentialitePage() {
  const { company, contact, legal } = siteConfig;
  const editor = company.legalName || company.name;

  const blocks: LegalBlock[] = [
    {
      title: "Responsable du traitement",
      paragraphs: [
        `Les données collectées sur ce site sont traitées par ${editor}.`,
        `Pour toute question relative à vos données, écrivez à ${contact.email}.`,
      ],
    },
    {
      title: "Données collectées",
      paragraphs: [
        "Le formulaire de contact collecte les informations que vous saisissez : nom, adresse e-mail, numéro de téléphone, motif de la demande et message.",
        "Aucune donnée n'est collectée à votre insu, et aucun compte utilisateur n'est créé.",
      ],
    },
    {
      title: "Finalité et base légale",
      paragraphs: [
        "Ces données servent uniquement à traiter votre demande et à vous recontacter.",
        "Le traitement repose sur votre consentement, exprimé par l'envoi volontaire du formulaire.",
      ],
    },
    {
      title: "Durée de conservation",
      paragraphs: [
        "Les demandes reçues sont conservées le temps nécessaire à leur traitement, puis archivées ou supprimées au plus tard trois ans après le dernier contact.",
      ],
    },
    {
      title: "Destinataires",
      paragraphs: [
        `Vos données sont destinées au seul usage de ${editor} et ne sont ni vendues ni cédées à des tiers.`,
        "Elles peuvent transiter par les prestataires techniques nécessaires au fonctionnement du site (hébergeur, service d'envoi de formulaire), dans le respect de la réglementation applicable.",
      ],
    },
    {
      title: "Vos droits",
      paragraphs: [
        "Conformément au Règlement général sur la protection des données, vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et d'opposition sur vos données.",
        `Pour l'exercer, adressez votre demande à ${contact.email}. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).`,
      ],
    },
    {
      title: "Cookies",
      paragraphs: [
        "Ce site ne dépose pas de cookie publicitaire ni de traceur à des fins de profilage.",
        "Les contenus intégrés provenant de services tiers (carte de localisation, par exemple) peuvent déposer leurs propres cookies, soumis à la politique de ces services.",
      ],
    },
  ];

  return (
    <LegalPage
      title="Politique de confidentialité"
      updatedAt={legal?.updatedAt}
      blocks={blocks}
    />
  );
}
