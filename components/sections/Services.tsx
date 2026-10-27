import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceCard from "@/components/ui/ServiceCard";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Grille des accompagnements.
 *
 * Chaque prestation est decrite dans `sections.services.items` : ajouter,
 * retirer ou reordonner une carte se fait uniquement dans `data/site.ts`.
 * Les cartes apparaissent en cascade, dans le sens de lecture.
 */
export function Services() {
  const services = siteConfig.sections.services;

  const columns = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  } as const;

  /*
   * `overlapPrevious` fait remonter la grille sur la section precedente : les
   * cartes mordent sur le fond du hero, comme dans la maquette de reference.
   * L'en-tete de section passe alors sous la grille, pour que le premier
   * element vu soit une carte.
   */
  const overlap = services.overlapPrevious === true;

  return (
    <section
      id="services"
      className={cn(
        "relative z-10 scroll-mt-24",
        overlap ? "-mt-28 bg-transparent pb-section sm:-mt-32" : "bg-surface py-section",
      )}
    >
      <Container size="wide" className={cn(overlap && "flex flex-col")}>
        <div
          className={cn(
            "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16",
            overlap && "order-2 mt-16",
          )}
        >
          <SectionTitle
            eyebrow={services.eyebrow}
            title={services.title}
            subtitle={services.subtitle}
            className="max-w-2xl"
          />

          {services.cta && (
            <Reveal delay={0.2} className="shrink-0">
              <Button action={services.cta} variantOverride="outline" />
            </Reveal>
          )}
        </div>

        <Stagger
          as="ul"
          gap={0.08}
          className={cn(
            "grid gap-5 sm:gap-6",
            overlap ? "order-1" : "mt-16",
            columns[services.columns ?? 3],
          )}
        >
          {services.items.map((service) => (
            <StaggerItem as="li" key={service.id} className="min-w-0">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export default Services;
