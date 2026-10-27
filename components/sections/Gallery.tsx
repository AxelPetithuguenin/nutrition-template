import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SmartImage from "@/components/ui/SmartImage";

/**
 * Galerie photo (locaux, realisations, equipe...).
 *
 * Section optionnelle : ajouter `"gallery"` dans `sectionOrder` et passer
 * `sections.gallery.enabled` a `true` dans `data/site.ts`.
 */
export function Gallery() {
  const gallery = siteConfig.sections.gallery;

  const columns = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  } as const;

  return (
    <Section id="gallery" background="background" containerSize="wide">
      <SectionTitle
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        subtitle={gallery.subtitle}
      />

      <ul className={cn("mt-12 grid gap-4", columns[gallery.columns ?? 3])}>
        {gallery.items.map((image, index) => (
          <Reveal as="li" key={image.src} delay={index * 80} className="min-w-0">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-theme">
              <SmartImage
                image={image}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default Gallery;
