import { siteConfig } from "@/data/site";
import { getActiveSections } from "@/lib/sections";
import type { SectionId } from "@/types/site";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Hours from "@/components/sections/Hours";
import Journal from "@/components/sections/Journal";
import Method from "@/components/sections/Method";
import Results from "@/components/sections/Results";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";

/**
 * Table de correspondance entre un identifiant de section et son composant.
 *
 * C'est le seul endroit a modifier pour ajouter une nouvelle section au
 * template : creer le composant, l'enregistrer ici, puis ajouter son
 * identifiant au type `SectionId` et a la configuration.
 */
const SECTION_COMPONENTS: Record<SectionId, React.ComponentType> = {
  hero: Hero,
  about: About,
  services: Services,
  method: Method,
  results: Results,
  journal: Journal,
  gallery: Gallery,
  testimonials: Testimonials,
  hours: Hours,
  faq: Faq,
  cta: Cta,
  contact: Contact,
};

/**
 * Rend les sections activees, dans l'ordre defini par `sectionOrder`
 * dans `data/site.ts`.
 */
export function SiteSections() {
  const sections = getActiveSections(siteConfig);

  return (
    <>
      {sections.map((id) => {
        const SectionComponent = SECTION_COMPONENTS[id];
        return SectionComponent ? <SectionComponent key={id} /> : null;
      })}
    </>
  );
}

export default SiteSections;
