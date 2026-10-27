/**
 * Traduction de la charte graphique du client en variables CSS.
 *
 * `data/site.ts` -> variables CSS -> utilitaires Tailwind.
 * Exemple : `theme.colors.primary` alimente `--c-primary`, que `app/globals.css`
 * expose a Tailwind sous le nom `primary` (`bg-primary`, `text-primary`, ...).
 *
 * Consequence : changer une couleur dans `data/site.ts` suffit a retheming
 * l'integralite du site, sans toucher a un seul composant.
 */
import type { ThemeConfig } from "@/types/site";

/** Correspondance entre l'option `radius` et sa valeur CSS. */
const RADIUS_SCALE = {
  none: "0px",
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.875rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  full: "9999px",
} as const;

/**
 * Construit la feuille de style injectee dans `<head>`.
 * Les valeurs sont issues exclusivement de la configuration client.
 */
export function buildThemeCss(theme: ThemeConfig, fontVariables: string): string {
  const c = theme.colors;
  const radius = RADIUS_SCALE[theme.radius] ?? RADIUS_SCALE.md;
  const overlay = clamp(theme.overlayOpacity ?? 0.45, 0, 1);

  return `:root {
  --c-primary: ${c.primary};
  --c-primary-dark: ${c.primaryDark};
  --c-primary-light: ${c.primaryLight};
  --c-secondary: ${c.secondary};
  --c-accent: ${c.accent};
  --c-background: ${c.background};
  --c-surface: ${c.surface};
  --c-text: ${c.text};
  --c-text-muted: ${c.textMuted};
  --c-border: ${c.border};
  --c-overlay: ${c.overlay ?? c.primary};
  --c-on-primary: ${c.onPrimary};
  --c-footer-bg: ${c.footerBackground};
  --c-footer-text: ${c.footerText};
  --radius-base: ${radius};
  --overlay-opacity: ${overlay};
  ${fontVariables}
}`;
}

/** Ramene une valeur numerique dans un intervalle. */
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
