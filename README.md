# Site vitrine premium — template à configuration unique

Site Next.js conçu pour une praticienne indépendante (nutrition), construit
comme un **template revendable** : un seul fichier de configuration par client,
aucun contenu écrit en dur dans les composants.

> **Règle du projet : pour livrer un nouveau site, on ne modifie que
> `data/site.ts` et les images de `public/images/`.**

---

## Démarrage

```bash
npm install && npm run dev
```

http://localhost:3000

| Commande            | Rôle                                  |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Serveur de développement              |
| `npm run build`     | Build de production                   |
| `npm start`         | Serveur de production (après `build`) |
| `npm run lint`      | Analyse ESLint                        |
| `npm run typecheck` | Vérification TypeScript sans build    |

Déploiement Vercel : importer le dépôt, définir `NEXT_PUBLIC_SITE_URL`, publier.
Aucune autre variable n'est requise.

---

## Stack

- **Next.js 16** (App Router) et **React 19**
- **TypeScript** en mode strict
- **Tailwind CSS v4**, piloté par les variables CSS issues de la configuration
- **Framer Motion** via `LazyMotion` (~5 ko d'animations au lieu du paquet complet)
- **Lucide React** pour les icônes
- `next/font` pour Playfair Display et Inter, `next/image` pour les visuels

---

## Direction artistique

Minimalisme et espace (Apple), matières naturelles et sobriété chromatique
(Aesop), fluidité du mouvement (Stripe).

### Palette

| Rôle                 | Couleur   | Usage                                    |
| -------------------- | --------- | ---------------------------------------- |
| Crème                | `#F8F6F2` | Fond général                             |
| Blanc cassé          | `#FDFCFA` | Sections alternées, cartes               |
| Vert profond         | `#36413E` | Boutons, liens, titres, pied de page     |
| Vert sauge           | `#A8B59A` | Aplats décoratifs, détails               |
| Or discret           | `#C9A96A` | Accents rares, contours, icônes sur vert |

**Le sauge n'est pas une couleur d'action.** Sous du texte blanc il plafonne à
2,2:1 de contraste, très en dessous du minimum AA. Il habille donc les fonds et
les détails, tandis que le vert profond porte tout ce qui est cliquable. Même
logique pour l'or : sur crème il tombe à 2,1:1, et les éléments qui portent une
information (étoiles de notation) utilisent l'utilitaire `text-gold-strong`,
un or densifié à ~3,6:1.

### Typographie

Playfair Display pour les titres, Inter pour le texte. Les tailles sont fluides
(`clamp()`), définies comme tokens dans `app/globals.css` :
`text-display`, `text-headline`, `text-title`, `text-lead`.

### Rythme et matière

Rayon de bordure : **24 px** (`theme.radius: "2xl"`). Cadence verticale unique
(`py-section`), largeur de lecture limitée à ~65 signes (`measure`), ombres à la
limite du perceptible — la profondeur vient des filets `1px` et des aplats.

---

## Animations

Primitives dans `components/motion/` :

| Composant     | Rôle                                                        |
| ------------- | ----------------------------------------------------------- |
| `Reveal`      | Apparition au défilement (`up`, `fade`, `scale`), une fois   |
| `Stagger`     | Cascade sur une liste, avec `StaggerItem`                    |
| `Parallax`    | Défilement différentiel, amplitude ≤ 8 %, lissé par ressort  |
| `MotionProvider` | Charge le moteur d'animation une seule fois (`LazyMotion`) |

Une seule courbe d'attenuation et une seule durée de référence pour tout le
site (`components/motion/variants.ts`) : c'est ce qui donne l'impression d'un
mouvement unifié plutôt que d'effets ajoutés section par section.

Tout se neutralise automatiquement sous `prefers-reduced-motion`, ou
globalement via `theme.animations: false`.

---

## Structure

```
data/site.ts          ← LE fichier à modifier pour chaque client
types/site.ts         ← Contrat de configuration, commenté
public/images/        ← Photos du client

app/
  layout.tsx          Métadonnées, polices, charte injectée, JSON-LD
  page.tsx            Page d'accueil (assemble les sections actives)
  globals.css         Tokens de design + utilitaires du template
  mentions-legales/   Page légale générée depuis la configuration
  confidentialite/    Politique RGPD générée depuis la configuration
  sitemap.ts          Plan du site
  robots.ts           robots.txt (respecte seo.noIndex)

components/
  motion/             Reveal, Stagger, Parallax, variants, provider
  layout/             Header, Footer, réseaux sociaux, gabarit légal
  sections/           Hero, About, Services, Method, Results, Journal,
                      Faq, Cta, Contact (+ Gallery, Testimonials, Hours
                      en réserve) et index.tsx (registre)
  ui/                 Button, SectionTitle, Container, Section, Icon,
                      ServiceCard, TestimonialCard, ArticleCard, StatBlock,
                      Accordion, SmartImage, StarRating, OpenStatus, Stats

lib/
  theme.ts            Couleurs du client → variables CSS
  fonts.ts            Registre des polices
  contact.ts          Liens tel:, mailto:, itinéraire, adresses
  hours.ts            Horaires, état « ouvert / fermé »
  labels.ts           Libellés d'interface (français par défaut)
  seo.ts              Métadonnées + données structurées
  sections.ts         Ordre et activation des sections
  utils.ts            Utilitaires
```

---

## Les sections

| Section        | Contenu                                                        |
| -------------- | -------------------------------------------------------------- |
| `hero`         | Fond clair, titre centré, visuels flottants, badge de preuve   |
| `about`        | Portrait, présentation, trois valeurs, signature               |
| `services`     | Grille d'accompagnements (icône, tarif, durée, inclus)         |
| `method`       | Timeline du parcours, étape par étape                          |
| `results`      | Statistiques + témoignages « avant / après » détaillés         |
| `journal`      | Articles et recettes, avec photo et temps de lecture           |
| `faq`          | Accordéon animé, alimente aussi le schema `FAQPage`            |
| `cta`          | Bannière d'appel à l'action                                    |
| `contact`      | Coordonnées, horaires, formulaire, plan                        |
| *en réserve*   | `gallery`, `testimonials`, `hours` — activables à la demande   |

Quatre mises en page de hero sont disponibles, choisies dans la configuration :

| `layout`     | Composition                                                     |
| ------------ | --------------------------------------------------------------- |
| `decorated`  | Fond clair dégradé, titre centré, visuels détourés qui flottent  |
| `fullscreen` | Photo plein écran, texte en bas à gauche, parallaxe              |
| `split`      | Texte à gauche, photo à droite                                   |
| `centered`   | Texte centré, photo en bandeau sous le texte                     |

**Visuels flottants** (`hero.decorations`) : chaque entrée place un fichier —
de préférence un SVG à fond transparent — en pourcentage du hero, avec sa
largeur, sa rotation et son décalage d'animation. Ils sont purement
ornementaux : masqués aux lecteurs d'écran, estompés sur petit écran, et
`desktopOnly` permet d'en retirer certains sous 1024 px. Les illustrations
livrées sont dans `public/images/deco/`.

**Cartes qui débordent** : `services.overlapPrevious: true` fait remonter la
grille des prestations sur le fond du hero, et place l'en-tête de section sous
les cartes. À n'utiliser que si les prestations suivent immédiatement le hero
dans `sectionOrder`.

`sectionOrder` gouverne l'ordre **et** la présence. Retirer une entrée masque la
section *et* les liens de menu qui pointaient vers elle : aucun lien mort.

---

## Ce que pilote `data/site.ts`

| Bloc           | Contrôle                                                            |
| -------------- | ------------------------------------------------------------------- |
| `company`      | Nom, slogan, description, métier, SIRET, TVA                        |
| `contact`      | Téléphone, e-mail, adresse, carte, rendez-vous, formulaire          |
| `social`       | Réseaux sociaux (en-tête, contact, pied de page)                    |
| `theme`        | Couleurs, polices, arrondis, voile des photos, animations           |
| `images`       | Logo, hero, portrait, méthode, partage, bannière                    |
| `navigation`   | Menu, bouton principal, bandeau d'annonce                           |
| `seo`          | URL, titre, description, mots-clés, note moyenne, indexation        |
| `sectionOrder` | Quelles sections, dans quel ordre                                   |
| `sections`     | Tous les textes du site                                             |
| `legal`        | Mentions légales et politique de confidentialité                    |
| `labels`       | Libellés d'interface (optionnel — français par défaut)              |
| `footer`       | Présentation, colonnes, mentions, crédit agence                     |

### Couleurs → classes Tailwind

`primary`, `primary-dark`, `primary-light`, `secondary`, `accent`,
`background`, `surface`, `ink` (texte), `muted`, `border`, `on-primary`,
`footer-bg`, `footer-text` — utilisables en `bg-*`, `text-*`, `border-*`.

### Icônes

Choisies **par leur nom** (`icon: "leaf"`). Le registre
(`components/ui/Icon.tsx`) s'appuie sur Lucide pour l'interface et le métier, et
conserve des tracés maison pour les logos de réseaux sociaux, que Lucide ne
distribue plus. Noms disponibles : type `IconName` dans `types/site.ts`.

### Libellés et traduction

Les textes du template (« Itinéraire », « Fermé », « Ouvrir le menu »…) vivent
dans `lib/labels.ts` et se surchargent depuis la configuration :

```ts
labels: { directions: "Voir le plan", openNow: "Ouvert jusqu'à {time}" }
```

Les segments entre accolades sont remplacés à l'affichage. Renseigner tout le
bloc permet de livrer le site dans une autre langue sans toucher au code.

### Formulaire de contact

Avec `contact.formEndpoint` (Formspree, Web3Forms, Basin…) : envoi en JSON.
Sans endpoint : ouverture du logiciel de messagerie avec un e-mail pré-rempli —
le site reste donc fonctionnel sans backend. Un champ piège filtre les robots.

---

## Images

| Usage           | Fichier          | Dimensions   |
| --------------- | ---------------- | ------------ |
| Logo            | `logo.svg`       | 190 × 48     |
| Logo sur sombre | `logo-light.svg` | 190 × 48     |
| Hero            | `hero.jpg`       | 2400 × 1350  |
| Portrait        | `about.jpg`      | 1200 × 1800  |
| Méthode         | `method.jpg`     | 1200 × 1800  |
| Bannière CTA    | `cta.jpg`        | 2000 × 1333  |
| Partage social  | `og.jpg`         | 1200 × 630   |
| Journal         | `journal-*.jpg`  | 1000 × ~650  |

**Provenance.** Les photos livrées viennent d'[Unsplash](https://unsplash.com/license) :
usage commercial autorisé, gratuit, sans attribution obligatoire, y compris sur
un site revendu à un client. Elles restent des images de banque : pour une
livraison définitive, une séance photo chez le client donnera un résultat
nettement supérieur — c'est le poste qui distingue le plus un site sur mesure
d'un gabarit.

**Direction photo à respecter** si vous remplacez un visuel :

- lumière naturelle latérale, jamais de flash ni d'éclairage frontal ;
- palette chaude et désaturée : bois clair, lin, céramique mate, verts sourds ;
  éviter le bleu marine, le blanc clinique et les couleurs primaires saturées ;
- un seul sujet par image, profondeur de champ courte ;
- le geste plutôt que la pose, jamais de sourire face objectif ;
- **aucun texte ni logo visible dans l'image** ;
- pour le hero : format paysage, 2400 px de large minimum, et une **zone calme
  en bas à gauche** où se pose le titre. Le cadrage se règle sans toucher au
  code, via `images.hero.position` dans `data/site.ts`.

**Toujours renseigner `alt`** : le texte alternatif est obligatoire dans la
configuration.

## Référencement

Généré depuis `data/site.ts` : balises `title` / `description`, canonique,
Open Graph et Twitter Card, `sitemap.xml`, `robots.txt`, favicon, et deux blocs
de données structurées :

- **`LocalBusiness`** — adresse, téléphone, coordonnées GPS, horaires,
  catalogue des prestations, note moyenne ;
- **`FAQPage`** — les questions peuvent s'afficher directement dans Google.

`seo.aggregateRating` ne doit être renseigné qu'avec des avis réels et visibles
sur la page : Google exige cette correspondance.

`seo.noIndex: true` bloque l'indexation — à utiliser en préproduction, et à
repasser à `false` avant la mise en ligne.

---

## Accessibilité

- Contrastes AA vérifiés sur toute la palette (voir la note sur le sauge et l'or).
- Lien d'évitement, focus visible homogène, navigation clavier complète.
- Accordéon relié par `aria-expanded` / `aria-controls`, panneau fermé retiré du DOM.
- Menu mobile fermable par `Échap` et hors du parcours de tabulation à l'état fermé.
- Timeline balisée en `<ol>` : l'ordre ne dépend pas du visuel.
- Animations neutralisées sous `prefers-reduced-motion`.

---

## Performance

- Toutes les pages sont générées statiquement.
- `LazyMotion` limite Framer Motion aux fonctionnalités réellement utilisées.
- **Les polices ne sont pas préchargées** : le registre propose huit familles,
  un site n'en utilise que deux, et le préchargement générait onze requêtes
  prioritaires. Sans lui, seules les deux polices appliquées sont téléchargées,
  et la substitution métrique de `next/font` évite tout saut de mise en page.
  Pour optimiser davantage sur un site livré : passer `preload: true` sur les
  deux polices choisies et retirer les autres du registre.
- Images via `next/image`, chargement différé sauf le visuel du hero (`priority`).

---

## Ajouter une section au template

1. Décrire la section dans `types/site.ts` (interface + entrée dans `SectionId`).
2. Créer `components/sections/MaSection.tsx`, qui lit ses données via `siteConfig`.
3. L'enregistrer dans `components/sections/index.tsx`.
4. Renseigner la configuration dans `data/site.ts`.

La section devient alors activable par n'importe quel client, sans code.
