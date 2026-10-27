/**
 * Resolution des sections affichees sur la page d'accueil.
 *
 * Deux leviers, tous deux dans `data/site.ts` :
 *   - `sectionOrder` : quelles sections, dans quel ordre ;
 *   - `sections.<nom>.enabled` : interrupteur par section.
 *
 * Une section est rendue si elle apparait dans `sectionOrder` ET qu'elle est activee.
 */
import type { SectionId, SiteConfig } from "@/types/site";

/** Sections reellement affichees, dans l'ordre choisi par le client. */
export function getActiveSections(config: SiteConfig): SectionId[] {
  return config.sectionOrder.filter((id) => config.sections[id]?.enabled);
}

/** Une section donnee est-elle affichee ? */
export function isSectionActive(config: SiteConfig, id: SectionId): boolean {
  return getActiveSections(config).includes(id);
}

/**
 * Liens de navigation valides : un lien d'ancre pointant vers une section
 * masquee est automatiquement retire du menu.
 * Cela evite les liens morts quand on desactive une section.
 */
export function getVisibleNavLinks(config: SiteConfig) {
  const active = getActiveSections(config);
  return config.navigation.links.filter((link) => {
    if (!link.href.startsWith("#")) return true;
    return active.includes(link.href.slice(1) as SectionId);
  });
}

/** Meme filtrage, applique aux colonnes de liens du pied de page. */
export function getVisibleFooterColumns(config: SiteConfig) {
  const active = getActiveSections(config);
  return (config.footer.columns ?? [])
    .map((column) => ({
      ...column,
      links: column.links.filter((link) => {
        if (!link.href.startsWith("#")) return true;
        return active.includes(link.href.slice(1) as SectionId);
      }),
    }))
    .filter((column) => column.links.length > 0);
}
