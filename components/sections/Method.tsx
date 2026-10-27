import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import SectionTitle from "@/components/ui/SectionTitle";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Section « La methode » : le parcours d'accompagnement, etape par etape.
 *
 * La timeline est construite sur une liste ordonnee : le trait vertical est
 * purement decoratif (`aria-hidden`), l'ordre reel etant porte par le balisage
 * `<ol>`. Un lecteur d'ecran entend donc « 1 sur 4 » sans dependre du visuel.
 *
 * Donnees : `sections.method.steps` dans `data/site.ts`.
 */
export function Method() {
  const method = siteConfig.sections.method;

  return (
    <section id="method" className="scroll-mt-24 bg-background py-section">
      <Container size="wide">
        <SectionTitle
          eyebrow={method.eyebrow}
          title={method.title}
          subtitle={method.subtitle}
          className="max-w-2xl"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* Timeline */}
          <Stagger as="ol" gap={0.12} className="relative flex flex-col">
            {/* Trait vertical continu, derriere les pastilles. */}
            <span
              aria-hidden="true"
              className="absolute top-3 bottom-3 left-[1.4375rem] w-px bg-border"
            />

            {method.steps.map((step, index) => (
              <StaggerItem as="li" key={step.id} className="relative flex gap-7 pb-12 last:pb-0">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  {step.icon ? (
                    <Icon name={step.icon} size={19} className="text-primary" />
                  ) : (
                    <span className="font-display text-base text-primary tabular">
                      {step.number ?? String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </span>

                <div className="min-w-0 pt-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl text-ink sm:text-2xl">{step.title}</h3>
                    <span className="eyebrow text-muted/80 tabular">
                      {step.number ?? String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {step.duration && (
                    <p className="mt-2 flex items-center gap-2 text-sm text-primary">
                      <Icon name="clock" size={14} />
                      {step.duration}
                    </p>
                  )}

                  <p className="mt-3 leading-[1.75] text-muted">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Visuel d'accompagnement */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            {method.image && (
              <Reveal preset="scale">
                <div className="group relative aspect-[4/5] overflow-hidden rounded-theme">
                  <SmartImage
                    image={method.image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="image-zoom group-hover:scale-[1.03]"
                  />
                </div>
              </Reveal>
            )}

            {method.cta && (
              <Reveal delay={0.15}>
                <Button action={method.cta} size="lg" />
              </Reveal>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Method;
