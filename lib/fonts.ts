/**
 * Registre des polices disponibles pour le template.
 *
 * Le client choisit ses polices dans `data/site.ts` :
 *   theme.typography = { heading: "fraunces", body: "dm-sans" }
 *
 * Pour ajouter une police : l'importer depuis `next/font/google`, lui donner
 * une variable CSS, l'ajouter au registre ci-dessous ET au type `FontFamily`
 * dans `types/site.ts`.
 *
 * ---------------------------------------------------------------------------
 * Pourquoi `preload: false` partout
 * ---------------------------------------------------------------------------
 * Le registre propose huit polices, mais un site n'en utilise que deux.
 * Avec le prechargement actif, Next.js injecte un `<link rel="preload">` pour
 * chaque police importee : onze requetes prioritaires au lieu de deux, ce qui
 * degrade nettement le score de performance.
 *
 * Sans prechargement, seules les polices reellement appliquees sont
 * telechargees, et la police de substitution generee par `next/font` reprend
 * les metriques de la police finale : la bascule ne provoque donc pas de saut
 * de mise en page.
 *
 * Les deux polices effectivement utilisees par ce site (`theme.typography`)
 * sont donc prechargees, les six autres non : deux requetes prioritaires au
 * lieu de onze. En changeant de polices pour un nouveau client, deplacer le
 * `preload: true` sur les deux nouvelles — et au besoin retirer du registre
 * celles dont ce client n'aura jamais l'usage.
 * ---------------------------------------------------------------------------
 */
import {
  DM_Sans,
  Fraunces,
  Inter,
  Lora,
  Montserrat,
  Outfit,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import type { FontFamily, TypographyConfig } from "@/types/site";

// Police du texte courant de ce site : prechargee.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: true });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap", preload: false });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap", preload: false });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap", preload: false });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", preload: false });
// Police des titres de ce site : prechargee.
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
  preload: false,
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
});

interface FontEntry {
  /** Classe generee par next/font, a poser sur <html>. */
  className: string;
  /** Nom de la variable CSS correspondante. */
  cssVar: string;
  /** Famille de secours utilisee pendant le chargement. */
  fallback: "sans" | "serif";
}

const FALLBACKS = {
  sans: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  serif: "ui-serif, Georgia, Cambria, Times New Roman, serif",
} as const;

const FONT_REGISTRY: Record<FontFamily, FontEntry> = {
  inter: { className: inter.variable, cssVar: "--font-inter", fallback: "sans" },
  "dm-sans": { className: dmSans.variable, cssVar: "--font-dm-sans", fallback: "sans" },
  outfit: { className: outfit.variable, cssVar: "--font-outfit", fallback: "sans" },
  poppins: { className: poppins.variable, cssVar: "--font-poppins", fallback: "sans" },
  montserrat: { className: montserrat.variable, cssVar: "--font-montserrat", fallback: "sans" },
  lora: { className: lora.variable, cssVar: "--font-lora", fallback: "serif" },
  fraunces: { className: fraunces.variable, cssVar: "--font-fraunces", fallback: "serif" },
  playfair: { className: playfair.variable, cssVar: "--font-playfair", fallback: "serif" },
};

/**
 * Resout les polices choisies dans la configuration.
 *
 * @returns `className` a poser sur <html> et le CSS liant
 *          `--font-heading` / `--font-body` aux polices choisies.
 */
export function resolveFonts(typography: TypographyConfig): {
  className: string;
  cssVariables: string;
} {
  const heading = FONT_REGISTRY[typography.heading] ?? FONT_REGISTRY.inter;
  const body = FONT_REGISTRY[typography.body] ?? FONT_REGISTRY.inter;

  // Les deux polices peuvent etre identiques : on evite alors la classe en double.
  const className = Array.from(
    new Set([heading.className, body.className]),
  ).join(" ");

  const cssVariables = [
    `--font-heading: var(${heading.cssVar}), ${FALLBACKS[heading.fallback]};`,
    `--font-body: var(${body.cssVar}), ${FALLBACKS[body.fallback]};`,
  ].join("\n  ");

  return { className, cssVariables };
}
