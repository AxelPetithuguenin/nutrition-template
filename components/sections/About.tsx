import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Section « A propos ».
 *
 * Portrait en grand format d'un cote, presentation de l'autre. Les trois
 * valeurs sont presentees en liste verticale separee par des filets plutot
 * qu'en cartes : la lecture reste continue, et la page ne se transforme pas
 * en grille de pastilles.
 *
 * Le cote du portrait est pilote par `sections.about.imageSide`.
 */
export function About() {
  const about = siteConfig.sections.about;
  const image = siteConfig.images.about;
  const imageFirst = (about.imageSide ?? "left") === "left";

  return (
    <section id="about" className="scroll-mt-24 bg-background py-section">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Portrait */}
          <Reveal
            preset="scale"
            className={cn("relative", !imageFirst && "lg:order-2")}
          >
            <div className="group relative aspect-[4/5] overflow-hidden rounded-theme">
              <SmartImage
                image={image}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="image-zoom group-hover:scale-[1.03]"
              />
            </div>

            {/* Aplat sauge decale : rappel de la charte, sans surcharge. */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -z-10 hidden size-56 rounded-theme bg-secondary/25 lg:block",
                imageFirst ? "-bottom-8 -left-8" : "-right-8 -bottom-8",
              )}
            />
          </Reveal>

          {/* Texte */}
          <div className={cn("flex flex-col", !imageFirst && "lg:order-1")}>
            <Stagger gap={0.08}>
              {about.eyebrow && (
                <StaggerItem className="flex items-center gap-3">
                  <span aria-hidden="true" className="rule-soft h-px w-8" />
                  <span className="eyebrow text-muted">{about.eyebrow}</span>
                </StaggerItem>
              )}

              <StaggerItem className="mt-5">
                <h2 className="text-headline text-ink">{about.title}</h2>
              </StaggerItem>

              {about.subtitle && (
                <StaggerItem className="mt-5">
                  <p className="text-lead text-primary">{about.subtitle}</p>
                </StaggerItem>
              )}

              <StaggerItem className="mt-6 flex flex-col gap-5">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-[1.75] text-muted">
                    {paragraph}
                  </p>
                ))}
              </StaggerItem>
            </Stagger>

            {/* Valeurs */}
            {about.bullets && about.bullets.length > 0 && (
              <Stagger as="ul" gap={0.1} className="mt-12 flex flex-col">
                {about.bullets.map((bullet) => (
                  <StaggerItem
                    as="li"
                    key={bullet.title}
                    className="flex gap-5 border-t border-border py-6 first:border-t-0 first:pt-0"
                  >
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <Icon name={bullet.icon ?? "check"} size={19} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-ink">{bullet.title}</h3>
                      {bullet.description && (
                        <p className="mt-2 leading-relaxed text-muted">{bullet.description}</p>
                      )}
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            )}

            {(about.signature || about.cta) && (
              <Reveal
                delay={0.15}
                className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-border pt-8"
              >
                {about.signature && (
                  <div>
                    <p className="font-display text-xl text-ink">{about.signature.name}</p>
                    {about.signature.role && (
                      <p className="mt-1 text-sm text-muted">{about.signature.role}</p>
                    )}
                  </div>
                )}
                {about.cta && <Button action={about.cta} variantOverride="outline" />}
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default About;
