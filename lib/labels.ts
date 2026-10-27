/**
 * Libelles d'interface du template.
 *
 * Les valeurs par defaut ci-dessous sont utilisees tant que le client ne les
 * surcharge pas dans `data/site.ts` (`labels: { ... }`). Aucun composant
 * n'ecrit de texte d'interface en dur : tout passe par `labels`.
 *
 * Pour livrer un site dans une autre langue, il suffit de renseigner ce bloc
 * dans la configuration — le code reste identique.
 */
import { siteConfig } from "@/data/site";
import type { LabelsConfig } from "@/types/site";

/** Libelles francais par defaut. */
const DEFAULT_LABELS: Required<LabelsConfig> = {
  skipToContent: "Aller au contenu principal",
  homeAria: "{name} — accueil",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  contactTitle: "Contact",
  hoursTitle: "Horaires",
  openingHoursTitle: "Horaires d'ouverture",
  findUsTitle: "Nous trouver",
  directions: "Itinéraire",
  followUs: "Nous suivre",
  closed: "Fermé",
  openNow: "Ouvert · ferme à {time}",
  closedNow: "Fermé · ouvre {when}",
  opensAt: "à {time}",
  opensTomorrow: "demain à {time}",
  opensOnDay: "{day} à {time}",
  phoneLabel: "Téléphone",
  emailLabel: "E-mail",
  addressLabel: "Adresse",
  selectPlaceholder: "Sélectionnez…",
  subjectFallback: "Sujet",
  sending: "Envoi en cours…",
  ratingOutOf: "{value} / 5",
  ratingAria: "Note de {value} sur 5",
  allRightsReserved: "Tous droits réservés.",
  lastUpdated: "Dernière mise à jour",
  readArticle: "Lire l'article",
  beforeLabel: "Avant",
  afterLabel: "Après",
  notFoundTitle: "Cette page n'existe pas",
  notFoundText:
    "Le lien est peut-être erroné ou la page a été déplacée. Revenez à l'accueil pour retrouver les informations sur {name}.",
  notFoundHome: "Retour à l'accueil",
  notFoundContact: "Nous contacter",
};

/**
 * Libelles effectifs : valeurs par defaut completees par celles du client.
 * A importer partout ou un texte d'interface est affiche.
 */
export const labels: Required<LabelsConfig> = {
  ...DEFAULT_LABELS,
  ...(siteConfig.labels ?? {}),
};

/**
 * Remplace les segments `{cle}` d'un libelle par leurs valeurs.
 *
 * @example t(labels.openNow, { time: "19h00" }) // "Ouvert · ferme à 19h00"
 */
export function t(
  template: string,
  values: Record<string, string | number> = {},
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
