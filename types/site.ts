/**
 * ============================================================================
 *  CONTRAT DE CONFIGURATION DU TEMPLATE
 * ============================================================================
 *
 *  Ce fichier decrit la FORME de la configuration client.
 *  Il ne contient AUCUNE donnee : les valeurs reelles vivent dans `data/site.ts`.
 *
 *  Regle du template : pour livrer un nouveau site client on ne touche que
 *    1. `data/site.ts`
 *    2. `public/images/`
 *
 *  Si une information doit devenir modifiable par le client, elle doit d'abord
 *  etre declaree ici, puis lue par les composants via `siteConfig`.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

/** Nom d'une icone disponible dans le registre `components/ui/Icon.tsx`. */
export type IconName =
  // Interface / navigation
  | "arrow-right"
  | "arrow-up-right"
  | "chevron-down"
  | "chevron-right"
  | "check"
  | "check-circle"
  | "menu"
  | "close"
  | "plus"
  | "minus"
  | "quote"
  | "star"
  | "sparkles"
  // Contact
  | "phone"
  | "mail"
  | "map-pin"
  | "clock"
  | "calendar"
  | "calendar-check"
  | "send"
  | "message"
  // Nutrition / sante
  | "leaf"
  | "sprout"
  | "salad"
  | "soup"
  | "utensils"
  | "apple"
  | "carrot"
  | "wheat"
  | "fish"
  | "flame"
  | "droplet"
  | "moon"
  | "sun"
  // Accompagnement
  | "heart"
  | "heart-pulse"
  | "activity"
  | "scale"
  | "dumbbell"
  | "biceps"
  | "flower"
  | "baby"
  | "brain"
  | "stethoscope"
  | "clipboard"
  | "notebook"
  | "trending-up"
  | "compass"
  | "target"
  | "shield"
  | "users"
  | "handshake"
  | "award"
  | "book"
  | "video"
  | "smile"
  | "footprints"
  // Reseaux sociaux (traces maison : Lucide ne fournit plus les marques)
  | "instagram"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "tiktok"
  | "whatsapp"
  | "pinterest"
  | "twitter"
  | "link";

/** Identifiants des sections de la page d'accueil (sert a l'ordre + l'ancrage). */
export type SectionId =
  | "hero"
  | "about"
  | "services"
  | "method"
  | "results"
  | "journal"
  | "gallery"
  | "testimonials"
  | "hours"
  | "faq"
  | "cta"
  | "contact";

/** Jours de la semaine, en anglais pour rester compatible avec le SEO (schema.org). */
export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/** Un bouton d'appel a l'action. */
export interface CallToAction {
  /** Texte affiche sur le bouton. */
  label: string;
  /**
   * Destination : ancre interne (`#contact`), page (`/mentions-legales`),
   * URL externe (`https://...`) ou lien special (`tel:`, `mailto:`).
   * Les valeurs `"tel"` et `"mailto"` sont resolues automatiquement a partir
   * des coordonnees definies dans `contact`.
   */
  href: string | "tel" | "mailto";
  /** Style du bouton. */
  variant?: "primary" | "secondary" | "ghost" | "outline";
  /** Icone optionnelle affichee avant le libelle. */
  icon?: IconName;
  /** Ouvre le lien dans un nouvel onglet. */
  external?: boolean;
}

/** Une image du site. */
export interface SiteImage {
  /** Chemin depuis `/public` (ex : `/images/hero.jpg`) ou URL absolue. */
  src: string;
  /** Texte alternatif : obligatoire pour l'accessibilite et le referencement. */
  alt: string;
  /** Largeur intrinseque en pixels (aide Next.js a eviter le layout shift). */
  width?: number;
  /** Hauteur intrinseque en pixels. */
  height?: number;
  /**
   * Cadrage lorsque l'image remplit un conteneur, ex : `"center"`, `"top"`,
   * `"50% 20%"`. Correspond a la propriete CSS `object-position`.
   */
  position?: string;
}

/* -------------------------------------------------------------------------- */
/*  1. Entreprise                                                             */
/* -------------------------------------------------------------------------- */

export interface CompanyConfig {
  /** Nom commercial affiche partout (header, footer, SEO). */
  name: string;
  /** Raison sociale, utilisee dans les mentions legales et le JSON-LD. */
  legalName?: string;
  /** Slogan court affiche sous le nom / dans le hero. */
  tagline: string;
  /** Une a deux phrases de presentation, reutilisees en meta description. */
  description: string;
  /** Metier affiche (ex : "Dieteticienne-nutritionniste"). */
  profession?: string;
  /** Annee de creation, affichee dans le copyright et le JSON-LD. */
  foundedYear?: number;
  /** Numero SIRET / identifiant legal, affiche dans les mentions legales. */
  legalId?: string;
  /** Numero de TVA intracommunautaire. */
  vatNumber?: string;
  /**
   * Identifiant professionnel reglemente, affiche dans les mentions legales.
   *
   * Selon le metier : numero ADELI ou RPPS pour une profession de sante,
   * numero d'inscription a l'ordre, carte professionnelle, numero de
   * formateur... Le libelle est libre pour rester utilisable d'un client
   * a l'autre.
   */
  professionalId?: { label: string; value: string };
}

/* -------------------------------------------------------------------------- */
/*  2. Coordonnees                                                            */
/* -------------------------------------------------------------------------- */

export interface AddressConfig {
  /** Numero et rue. */
  street: string;
  /** Complement d'adresse (batiment, etage, code). */
  complement?: string;
  /** Code postal. */
  postalCode: string;
  /** Ville. */
  city: string;
  /** Region / departement (optionnel, utilise par le SEO local). */
  region?: string;
  /** Pays. */
  country: string;
  /** Code pays ISO 3166-1 alpha-2, ex : "FR". */
  countryCode?: string;
  /** Coordonnees GPS, utilisees par le JSON-LD LocalBusiness. */
  coordinates?: { latitude: number; longitude: number };
}

export interface ContactConfig {
  /** Telephone au format international, utilise pour le lien `tel:` (ex : "+33612345678"). */
  phone: string;
  /** Telephone mis en forme pour l'affichage (ex : "06 12 34 56 78"). */
  phoneDisplay?: string;
  /** Adresse e-mail de contact. */
  email: string;
  /** Adresse postale du cabinet / de l'entreprise. */
  address: AddressConfig;
  /** Lien "Itineraire" (Google Maps, Apple Plans...). Genere automatiquement si absent. */
  mapsUrl?: string;
  /** URL d'integration de la carte (iframe Google Maps). Laisser vide pour masquer la carte. */
  mapEmbedUrl?: string;
  /** Lien de prise de rendez-vous externe (Doctolib, Calendly, Resalib...). */
  bookingUrl?: string;
  /**
   * Endpoint du formulaire de contact (Formspree, Web3Forms, Basin, n8n...).
   * Si vide, le formulaire bascule automatiquement sur un `mailto:` pre-rempli.
   */
  formEndpoint?: string;
}

/* -------------------------------------------------------------------------- */
/*  3. Reseaux sociaux                                                        */
/* -------------------------------------------------------------------------- */

export interface SocialLink {
  /** Nom affiche / aria-label (ex : "Instagram"). */
  label: string;
  /** URL complete du profil. */
  href: string;
  /** Icone du reseau. */
  icon: IconName;
}

/* -------------------------------------------------------------------------- */
/*  4. Charte graphique                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Palette du client. Chaque couleur est injectee en variable CSS et devient
 * utilisable dans Tailwind (`bg-primary`, `text-accent`, `border-border`...).
 * Format accepte : hex, rgb(), hsl(), oklch().
 */
export interface ColorsConfig {
  /** Couleur principale : boutons, liens, accents forts. */
  primary: string;
  /** Variante foncee de la couleur principale (survol, contrastes). */
  primaryDark: string;
  /** Variante claire : fonds teintes, badges. */
  primaryLight: string;
  /** Couleur secondaire / complementaire. */
  secondary: string;
  /** Couleur d'accent : mises en avant, etoiles, details. */
  accent: string;
  /** Fond general des pages. */
  background: string;
  /** Fond des sections alternees et des cartes. */
  surface: string;
  /** Couleur du texte principal. */
  text: string;
  /** Couleur du texte secondaire (paragraphes, legendes). */
  textMuted: string;
  /** Couleur des bordures et separateurs. */
  border: string;
  /**
   * Couleur des voiles poses sur les photos (hero, banniere).
   *
   * Doit toujours etre une couleur SOMBRE : c'est elle qui garantit la
   * lisibilite du texte clair pose sur un visuel, quelle que soit la photo
   * fournie par le client. Sans valeur, la couleur principale est utilisee.
   */
  overlay?: string;
  /** Couleur du texte pose sur la couleur principale. */
  onPrimary: string;
  /** Fond du pied de page. */
  footerBackground: string;
  /** Texte du pied de page. */
  footerText: string;
}

/** Polices disponibles (chargees via `next/font`, voir `lib/fonts.ts`). */
export type FontFamily =
  | "inter"
  | "poppins"
  | "playfair"
  | "dm-sans"
  | "lora"
  | "montserrat"
  | "fraunces"
  | "outfit";

export interface TypographyConfig {
  /** Police des titres. */
  heading: FontFamily;
  /** Police du texte courant. */
  body: FontFamily;
}

export interface ThemeConfig {
  /** Palette de couleurs du client. */
  colors: ColorsConfig;
  /** Polices du site. */
  typography: TypographyConfig;
  /**
   * Arrondi global des cartes et boutons.
   * `2xl` vaut 24 px : la valeur retenue pour la charte de ce site.
   */
  radius: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Intensite du voile sombre pose sur les images de fond (0 = aucun, 1 = opaque). */
  overlayOpacity?: number;
  /** Active les animations d'apparition au defilement. */
  animations?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  5. Images                                                                 */
/* -------------------------------------------------------------------------- */

export interface ImagesConfig {
  /** Logo affiche dans l'en-tete. Laisser vide pour afficher le nom en toutes lettres. */
  logo?: SiteImage;
  /** Variante du logo pour fonds sombres (pied de page). */
  logoLight?: SiteImage;
  /** Visuel principal du hero. */
  hero: SiteImage;
  /** Portrait / photo de la section "A propos". */
  about: SiteImage;
  /** Image de partage sur les reseaux sociaux (1200x630 recommande). */
  ogImage?: SiteImage;
  /** Visuel de fond de la banniere d'appel a l'action. */
  ctaBackground?: SiteImage;
}

/* -------------------------------------------------------------------------- */
/*  6. Navigation                                                             */
/* -------------------------------------------------------------------------- */

export interface NavLink {
  /** Libelle du lien. */
  label: string;
  /** Ancre (`#services`), page interne (`/blog`) ou URL externe. */
  href: string;
  /** Ouvre dans un nouvel onglet. */
  external?: boolean;
}

export interface NavigationConfig {
  /** Liens du menu principal. */
  links: NavLink[];
  /** Bouton d'action de l'en-tete. */
  cta?: CallToAction;
  /** Affiche le numero de telephone dans l'en-tete (desktop). */
  showPhone?: boolean;
  /** Bandeau d'annonce affiche au-dessus de l'en-tete. */
  announcement?: {
    text: string;
    link?: { label: string; href: string };
  };
}

/* -------------------------------------------------------------------------- */
/*  7. Sections de contenu                                                    */
/* -------------------------------------------------------------------------- */

/** Proprietes communes a toutes les sections. */
interface BaseSection {
  /** Passe a `false` pour retirer la section du site (et du menu). */
  enabled: boolean;
  /** Sur-titre affiche au-dessus du titre. */
  eyebrow?: string;
  /** Titre de la section. */
  title: string;
  /** Sous-titre / chapeau. */
  subtitle?: string;
}

/** Chiffre cle (annees d'experience, clients accompagnes...). */
export interface StatItem {
  /** Valeur affichee (ex : "+350", "12 ans", "98 %"). */
  value: string;
  /** Libelle sous la valeur. */
  label: string;
  /** Icone optionnelle. */
  icon?: IconName;
}

/**
 * Élément décoratif flottant du hero (fruit détouré, feuillage...).
 *
 * Purement ornemental : ces visuels sont masqués aux lecteurs d'écran et
 * n'apportent aucune information. Ils se positionnent en pourcentage du hero,
 * ce qui les fait suivre la mise en page à toutes les largeurs.
 */
export interface HeroDecoration {
  /** Chemin du visuel, de préférence un SVG à fond transparent. */
  src: string;
  /** Position, en pourcentage ou en unité CSS. */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Largeur du visuel (une valeur `clamp()` le rend fluide). */
  width: string;
  /** Rotation, en degrés. */
  rotate?: number;
  /** Décalage de l'animation de flottement, en secondes. */
  delay?: number;
  /** Masque l'élément en dessous de 1024 px, pour ne pas charger l'écran. */
  desktopOnly?: boolean;
}

export interface HeroSection {
  enabled: boolean;
  /** Sur-titre / badge affiche au-dessus du titre. */
  eyebrow?: string;
  /** Titre principal (h1). Utiliser `titleHighlight` pour colorer une partie. */
  title: string;
  /** Portion du titre mise en couleur (doit etre contenue dans `title`). */
  titleHighlight?: string;
  /** Paragraphe d'accroche. */
  subtitle: string;
  /** Boutons d'action. */
  actions?: CallToAction[];
  /** Points de reassurance affiches sous les boutons. */
  highlights?: { icon?: IconName; text: string }[];
  /**
   * Badge de preuve sociale affiche a cote du texte
   * (ex : « +500 patients accompagnes »).
   */
  badge?: {
    value: string;
    label: string;
    icon?: IconName;
  };
  /**
   * Mise en page du hero.
   *
   * - `decorated`  : fond clair, texte centré, visuels détourés qui flottent ;
   * - `fullscreen` : photo plein écran, texte en bas à gauche ;
   * - `split`      : texte à gauche, photo à droite ;
   * - `centered`   : texte centré, photo en bandeau.
   */
  layout?: "split" | "centered" | "fullscreen" | "decorated";
  /**
   * Visuels décoratifs de la mise en page `decorated`.
   * Retirer une entrée suffit à alléger la composition.
   */
  decorations?: HeroDecoration[];
}

export interface AboutSection extends BaseSection {
  /** Paragraphes de presentation. */
  paragraphs: string[];
  /** Liste a puces (diplomes, valeurs, methode...). */
  bullets?: { icon?: IconName; title: string; description?: string }[];
  /** Signature affichee sous le texte (nom + fonction). */
  signature?: { name: string; role?: string };
  /** Bouton d'action de la section. */
  cta?: CallToAction;
  /** Chiffres cles. */
  stats?: StatItem[];
  /** Cote ou s'affiche la photo. */
  imageSide?: "left" | "right";
}

export interface ServiceItem {
  /** Identifiant unique (sert de cle React et d'ancre). */
  id: string;
  /** Nom de la prestation. */
  title: string;
  /** Description courte. */
  description: string;
  /** Icone de la carte. */
  icon: IconName;
  /** Tarif affiche (ex : "60 EUR", "a partir de 45 EUR"). */
  price?: string;
  /** Duree affichee (ex : "45 min"). */
  duration?: string;
  /** Points inclus dans la prestation. */
  features?: string[];
  /** Image illustrant la prestation. */
  image?: SiteImage;
  /** Met la carte en avant (bordure + badge). */
  featured?: boolean;
  /** Texte du badge de mise en avant. */
  badge?: string;
  /** Bouton propre a la prestation. */
  cta?: CallToAction;
}

export interface ServicesSection extends BaseSection {
  /** Liste des prestations. */
  items: ServiceItem[];
  /**
   * Fait remonter la grille sur la section précédente.
   * Utilisé avec le hero `decorated`, dont les cartes débordent sur le fond.
   */
  overlapPrevious?: boolean;
  /** Nombre de colonnes sur grand ecran. */
  columns?: 2 | 3 | 4;
  /** Bouton affiche sous la grille. */
  cta?: CallToAction;
}

/* ------------------------------- Methode -------------------------------- */

export interface MethodStep {
  id: string;
  /** Numero affiche (ex : "01"). Genere automatiquement si absent. */
  number?: string;
  /** Titre de l'etape. */
  title: string;
  /** Description de l'etape. */
  description: string;
  /** Duree indicative affichee sous le titre (ex : "15 min, par telephone"). */
  duration?: string;
  /** Icone de l'etape. */
  icon?: IconName;
}

export interface MethodSection extends BaseSection {
  /** Etapes du parcours, dans l'ordre. */
  steps: MethodStep[];
  /** Bouton affiche en fin de parcours. */
  cta?: CallToAction;
  /** Visuel d'accompagnement affiche a cote de la timeline. */
  image?: SiteImage;
}

/* ------------------------------ Resultats ------------------------------- */

/** Resultat chiffre mis en avant (avant / apres). */
export interface ResultStat {
  /** Valeur affichee (ex : "-8 kg", "92 %"). */
  value: string;
  /** Intitule sous la valeur. */
  label: string;
  /** Precision facultative (methodologie, periode). */
  detail?: string;
}

export interface ResultsSection extends BaseSection {
  /** Chiffres cles affiches en haut de section. */
  stats?: ResultStat[];
  /**
   * Temoignages detailles, avec situation de depart et resultat obtenu.
   * Ils alimentent la preuve sociale de la section "avant / apres".
   */
  items: ResultStory[];
  /** Mention de transparence affichee sous les temoignages. */
  disclaimer?: string;
  /** Bouton de fin de section. */
  cta?: CallToAction;
}

/** Temoignage structure en avant / apres. */
export interface ResultStory {
  id: string;
  /** Prenom ou identite affichee. */
  name: string;
  /** Contexte (age, profession, objectif). */
  context?: string;
  /** Duree de l'accompagnement (ex : "6 mois"). */
  duration?: string;
  /** Situation initiale. */
  before: string;
  /** Situation obtenue. */
  after: string;
  /** Citation du patient. */
  quote: string;
  /** Resultat chiffre mis en avant sur la carte (ex : "-8 kg"). */
  metric?: { value: string; label: string };
  /** Note sur 5. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Photo du patient. */
  avatar?: SiteImage;
}

/* ------------------------------- Journal -------------------------------- */

export interface JournalArticle {
  id: string;
  /** Titre de l'article. */
  title: string;
  /** Chapeau / resume. */
  excerpt: string;
  /** Rubrique affichee en etiquette (ex : "Recette", "Conseil"). */
  category?: string;
  /** Date affichee (ex : "12 janvier 2026"). */
  date?: string;
  /** Temps de lecture (ex : "4 min"). */
  readingTime?: string;
  /** Visuel de l'article. */
  image: SiteImage;
  /** Lien vers l'article complet (page interne ou externe). */
  href: string;
}

export interface JournalSection extends BaseSection {
  articles: JournalArticle[];
  /** Bouton vers l'ensemble des publications. */
  cta?: CallToAction;
}

export interface TestimonialItem {
  id: string;
  /** Nom de la personne. */
  name: string;
  /** Fonction, age ou contexte. */
  role?: string;
  /** Ville, pour la preuve locale. */
  city?: string;
  /** Temoignage. */
  quote: string;
  /** Note sur 5. */
  rating?: 1 | 2 | 3 | 4 | 5;
  /** Photo / avatar. */
  avatar?: SiteImage;
  /** Date affichee (ex : "Mars 2025"). */
  date?: string;
}

export interface TestimonialsSection extends BaseSection {
  items: TestimonialItem[];
  /** Note moyenne affichee en resume (ex : 4.9). */
  averageRating?: number;
  /** Lien vers la page d'avis publics (Google, Doctolib...). */
  reviewsUrl?: { label: string; href: string };
}

export interface FaqItem {
  id: string;
  question: string;
  /** Reponse. Les sauts de ligne `\n` creent des paragraphes. */
  answer: string;
}

export interface FaqSection extends BaseSection {
  items: FaqItem[];
  /** Encart d'aide affiche a cote des questions. */
  aside?: {
    title: string;
    text: string;
    cta?: CallToAction;
  };
}

/** Creneau horaire d'une journee. */
export interface TimeRange {
  /** Heure d'ouverture au format 24h "HH:MM". */
  open: string;
  /** Heure de fermeture au format 24h "HH:MM". */
  close: string;
}

export interface DaySchedule {
  /** Jour concerne. */
  day: Weekday;
  /**
   * Creneaux de la journee. Tableau vide = ferme.
   * Deux creneaux permettent de gerer la pause dejeuner.
   */
  ranges: TimeRange[];
  /** Mention personnalisee affichee a la place des horaires (ex : "Sur rendez-vous"). */
  note?: string;
}

export interface HoursSection extends BaseSection {
  /** Horaires de la semaine, du lundi au dimanche. */
  schedule: DaySchedule[];
  /** Fuseau horaire IANA, utilise pour le badge "ouvert / ferme". */
  timezone?: string;
  /** Information complementaire (fermetures, jours feries...). */
  note?: string;
  /** Affiche le badge d'ouverture en temps reel. */
  showOpenStatus?: boolean;
}

export interface ContactSection extends BaseSection {
  /** Active le formulaire de contact. */
  showForm?: boolean;
  /** Active la carte. */
  showMap?: boolean;
  /**
   * Rappelle les horaires dans la section contact.
   * Utile lorsque la section « hours » autonome n'est pas affichee.
   */
  showHours?: boolean;
  /** Textes du formulaire. */
  form?: {
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    subjectLabel?: string;
    /** Sujets proposes dans la liste deroulante. Vide = champ masque. */
    subjects?: string[];
    messageLabel: string;
    submitLabel: string;
    /** Message affiche apres un envoi reussi. */
    successMessage: string;
    /** Message affiche en cas d'erreur. */
    errorMessage: string;
    /** Mention RGPD affichee sous le formulaire. */
    consentText?: string;
  };
}

export interface CtaSection {
  enabled: boolean;
  title: string;
  subtitle?: string;
  actions?: CallToAction[];
}

export interface GallerySection extends BaseSection {
  /** Photos de la galerie. */
  items: SiteImage[];
  /** Nombre de colonnes sur grand ecran. */
  columns?: 2 | 3 | 4;
}

/* -------------------------------------------------------------------------- */
/*  8. Pied de page                                                           */
/* -------------------------------------------------------------------------- */

export interface FooterConfig {
  /** Texte court sous le logo. */
  about?: string;
  /** Colonnes de liens. */
  columns?: { title: string; links: NavLink[] }[];
  /** Liens legaux affiches sur la derniere ligne. */
  legalLinks?: NavLink[];
  /** Ligne de credit (agence, mentions). Laisser vide pour masquer. */
  credits?: { label: string; href?: string };
  /** Affiche le bloc de coordonnees. */
  showContact?: boolean;
  /** Affiche le rappel des horaires. */
  showHours?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  9. Libelles d'interface                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Textes d'interface du template (boutons d'accessibilite, intitules du pied
 * de page, etats d'ouverture...).
 *
 * Toutes les cles sont optionnelles : les valeurs par defaut en francais
 * sont definies dans `lib/labels.ts`. Ce bloc sert a ajuster le ton d'un
 * client, ou a traduire le site sans toucher aux composants.
 *
 * Les segments entre accolades sont remplaces a l'affichage :
 * `{time}`, `{day}`, `{name}`, `{value}`.
 */
export interface LabelsConfig {
  /** Lien d'evitement, premier element atteint au clavier. */
  skipToContent?: string;
  /** Libelle accessible du logo. `{name}` = nom de l'entreprise. */
  homeAria?: string;
  openMenu?: string;
  closeMenu?: string;
  /** Intitule du bloc de coordonnees (pied de page, section horaires). */
  contactTitle?: string;
  hoursTitle?: string;
  /** Titre du tableau des horaires. */
  openingHoursTitle?: string;
  /** Titre du bloc d'adresse dans la section horaires. */
  findUsTitle?: string;
  /** Bouton d'itineraire. */
  directions?: string;
  /** Intitule au-dessus des reseaux sociaux. */
  followUs?: string;
  /** Mention affichee pour un jour sans creneau. */
  closed?: string;
  /** Etat d'ouverture. `{time}` = heure de fermeture. */
  openNow?: string;
  /** Etat de fermeture. `{when}` = prochaine ouverture formatee. */
  closedNow?: string;
  /** Prochaine ouverture, le jour meme. `{time}` = heure. */
  opensAt?: string;
  /** Prochaine ouverture, le lendemain. */
  opensTomorrow?: string;
  /** Prochaine ouverture, plus tard dans la semaine. `{day}` et `{time}`. */
  opensOnDay?: string;
  /** Etiquettes des coordonnees dans la section contact. */
  phoneLabel?: string;
  emailLabel?: string;
  addressLabel?: string;
  /** Option vide d'une liste deroulante. */
  selectPlaceholder?: string;
  /** Intitule du champ sujet si la configuration n'en fournit pas. */
  subjectFallback?: string;
  /** Bouton d'envoi pendant la soumission. */
  sending?: string;
  /** Note sur cinq. `{value}` = note. */
  ratingOutOf?: string;
  /** Description accessible d'une note. `{value}` = note. */
  ratingAria?: string;
  /** Mention de copyright, apres le nom et l'annee. */
  allRightsReserved?: string;
  /** Prefixe de date sur les pages legales. */
  lastUpdated?: string;
  /** Lien de lecture d'un article du journal. */
  readArticle?: string;
  /** Intitules de la carte avant / apres. */
  beforeLabel?: string;
  afterLabel?: string;
  /** Page 404. `{name}` = nom de l'entreprise. */
  notFoundTitle?: string;
  notFoundText?: string;
  notFoundHome?: string;
  notFoundContact?: string;
}

/* -------------------------------------------------------------------------- */
/*  10. Pages legales                                                         */
/* -------------------------------------------------------------------------- */

export interface LegalConfig {
  /** Directeur de la publication. Par defaut : la raison sociale. */
  publicationDirector?: string;
  /** Hebergeur du site, mention obligatoire en France. */
  host?: {
    name: string;
    address?: string;
    url?: string;
  };
  /** Date de derniere mise a jour affichee en haut des pages legales. */
  updatedAt?: string;
  /** Paragraphes supplementaires ajoutes aux mentions legales. */
  extraSections?: { title: string; paragraphs: string[] }[];
}

/* -------------------------------------------------------------------------- */
/*  11. SEO                                                                   */
/* -------------------------------------------------------------------------- */

export interface SeoConfig {
  /** URL canonique du site, sans slash final (ex : "https://www.exemple.fr"). */
  siteUrl: string;
  /** Langue du document (ex : "fr"). */
  lang: string;
  /** Locale complete pour Open Graph (ex : "fr_FR"). */
  locale: string;
  /** Titre de la page d'accueil. Par defaut : "Nom - Slogan". */
  title?: string;
  /** Meta description. Par defaut : la description de l'entreprise. */
  description?: string;
  /** Mots-cles principaux. */
  keywords?: string[];
  /**
   * Type d'etablissement schema.org (ex : "LocalBusiness", "HealthAndBeautyBusiness",
   * "Restaurant", "Dentist"). Voir https://schema.org/LocalBusiness
   */
  businessType?: string;
  /** Gamme de prix affichee dans le JSON-LD (ex : "EUR", "50-90 EUR"). */
  priceRange?: string;
  /**
   * Note moyenne declaree dans les donnees structurees (etoiles dans Google).
   *
   * A ne renseigner qu'avec des avis reels et verifiables, et uniquement si
   * ces avis sont visibles sur la page : Google exige cette correspondance et
   * sanctionne les notes fabriquees.
   */
  aggregateRating?: {
    /** Note moyenne sur 5. */
    value: number;
    /** Nombre d'avis pris en compte. */
    count: number;
  };
  /** Code de verification Google Search Console. */
  googleSiteVerification?: string;
  /** Empeche l'indexation (utile pour une preproduction). */
  noIndex?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Configuration complete                                                    */
/* -------------------------------------------------------------------------- */

export interface SiteConfig {
  company: CompanyConfig;
  contact: ContactConfig;
  social: SocialLink[];
  theme: ThemeConfig;
  images: ImagesConfig;
  navigation: NavigationConfig;
  seo: SeoConfig;
  /** Contenu des pages "Mentions legales" et "Confidentialite". */
  legal?: LegalConfig;
  /**
   * Textes d'interface. Omettre ce bloc conserve les libelles francais
   * par defaut (voir `lib/labels.ts`).
   */
  labels?: LabelsConfig;
  footer: FooterConfig;
  /**
   * Ordre d'affichage des sections sur la page d'accueil.
   * Retirer un identifiant suffit a masquer la section (equivalent a `enabled: false`).
   */
  sectionOrder: SectionId[];
  sections: {
    hero: HeroSection;
    about: AboutSection;
    services: ServicesSection;
    method: MethodSection;
    results: ResultsSection;
    journal: JournalSection;
    gallery: GallerySection;
    testimonials: TestimonialsSection;
    hours: HoursSection;
    faq: FaqSection;
    cta: CtaSection;
    contact: ContactSection;
  };
}
