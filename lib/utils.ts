/**
 * Petites fonctions utilitaires partagees par les composants.
 */

/**
 * Concatene des classes CSS en ignorant les valeurs vides.
 * Evite d'ajouter une dependance (clsx / classnames) au template.
 *
 * @example cn("btn", isActive && "btn--active")
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Decoupe un titre en trois parties pour mettre en couleur `highlight`.
 * Retourne `[avant, partieColoree, apres]`.
 * Si `highlight` est absent du titre, tout le titre est renvoye dans `avant`.
 */
export function splitHighlight(
  title: string,
  highlight?: string,
): [string, string, string] {
  if (!highlight) return [title, "", ""];
  const index = title.indexOf(highlight);
  if (index === -1) return [title, "", ""];
  return [
    title.slice(0, index),
    highlight,
    title.slice(index + highlight.length),
  ];
}

/** Transforme un texte multi-lignes en tableau de paragraphes. */
export function toParagraphs(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
