import SiteSections from "@/components/sections";

/**
 * Page d'accueil.
 *
 * Elle ne decrit aucun contenu : les sections, leur ordre et leurs textes
 * viennent de `data/site.ts`. Ajouter ou retirer une section se fait donc
 * sans jamais ouvrir ce fichier.
 */
export default function HomePage() {
  return <SiteSections />;
}
