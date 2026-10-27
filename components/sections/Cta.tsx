import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SmartImage from "@/components/ui/SmartImage";
import Parallax from "@/components/motion/Parallax";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Banniere d'appel a l'action.
 *
 * Si `images.ctaBackground` est renseignee, elle sert de fond avec un voile
 * et une parallaxe tres legere ; sinon la banniere utilise un aplat vert
 * profond. Dans les deux cas le texte reste clair et lisible.
 */
export function Cta() {
  const cta = siteConfig.sections.cta;
  const background = siteConfig.images.ctaBackground;
  const hasImage = Boolean(background?.src);

  return (
    <section id="cta" className="relative isolate scroll-mt-24 overflow-hidden">
      {hasImage ? (
        <>
          <Parallax amount={6} className="absolute inset-0 -z-10">
            <div className="relative h-[110%] w-full">
              <SmartImage image={background} fill sizes="100vw" />
            </div>
          </Parallax>
          <div className="overlay-scrim absolute inset-0 -z-10" aria-hidden="true" />
          <div className="overlay-gradient absolute inset-0 -z-10" aria-hidden="true" />
        </>
      ) : (
        <div className="absolute inset-0 -z-10 bg-primary" aria-hidden="true" />
      )}

      <Container size="narrow" className="py-section">
        <Stagger gap={0.1} className="flex flex-col items-center text-center">
          <StaggerItem>
            <h2 className="text-headline text-white">{cta.title}</h2>
          </StaggerItem>

          {cta.subtitle && (
            <StaggerItem className="mt-6">
              <p className="measure text-lead text-white/80">{cta.subtitle}</p>
            </StaggerItem>
          )}

          {cta.actions && cta.actions.length > 0 && (
            <StaggerItem className="mt-10">
              <div className="flex flex-wrap justify-center gap-3">
                {cta.actions.map((action, index) => (
                  <Button
                    key={action.label}
                    action={action}
                    size="lg"
                    variantOverride={index === 0 ? "light" : "outline-light"}
                  />
                ))}
              </div>
            </StaggerItem>
          )}
        </Stagger>
      </Container>
    </section>
  );
}

export default Cta;
