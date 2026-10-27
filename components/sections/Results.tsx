import { siteConfig } from "@/data/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import StatBlock from "@/components/ui/StatBlock";
import TestimonialCard from "@/components/ui/TestimonialCard";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Section « Resultats » : chiffres cles puis temoignages avant / apres.
 *
 * Les statistiques ouvrent la section sur un fond vert profond — seul aplat
 * sombre de la page hors pied de page, ce qui en fait un point d'arret visuel.
 * Les temoignages detaillent ensuite ces chiffres par des trajectoires
 * individuelles.
 *
 * `disclaimer` affiche une mention de transparence : les resultats
 * nutritionnels varient d'une personne a l'autre, et l'annoncer renforce la
 * credibilite plutot qu'elle ne l'affaiblit.
 *
 * Donnees : `sections.results` dans `data/site.ts`.
 */
export function Results() {
  const results = siteConfig.sections.results;
  const hasStats = Boolean(results.stats && results.stats.length > 0);

  return (
    <section id="results" className="scroll-mt-24 bg-background py-section">
      <Container size="wide">
        <SectionTitle
          eyebrow={results.eyebrow}
          title={results.title}
          subtitle={results.subtitle}
          align="center"
          className="mx-auto max-w-2xl"
        />

        {hasStats && (
          <Reveal preset="scale" className="mt-14">
            {/* Aplat vert profond, et non sauge : sur sauge, du texte blanc
                tomberait a environ 2:1 de contraste, sous le minimum AA. */}
            <div className="rounded-theme bg-primary px-8 py-12 sm:px-14 sm:py-14">
              <Stagger
                as="ul"
                gap={0.1}
                className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
              >
                {results.stats!.map((stat) => (
                  <StaggerItem as="li" key={stat.label} className="min-w-0">
                    <StatBlock
                      value={stat.value}
                      label={stat.label}
                      detail={stat.detail}
                      tone="light"
                      align="center"
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </Reveal>
        )}

        <Stagger as="ul" gap={0.09} className="mt-6 grid gap-5 sm:gap-6 lg:grid-cols-3">
          {results.items.map((story) => (
            <StaggerItem as="li" key={story.id} className="min-w-0">
              <TestimonialCard story={story} />
            </StaggerItem>
          ))}
        </Stagger>

        {(results.disclaimer || results.cta) && (
          <Reveal
            delay={0.1}
            className="mt-12 flex flex-col items-center gap-6 text-center"
          >
            {results.cta && <Button action={results.cta} size="lg" />}
            {results.disclaimer && (
              <p className="measure text-sm leading-relaxed text-muted">
                {results.disclaimer}
              </p>
            )}
          </Reveal>
        )}
      </Container>
    </section>
  );
}

export default Results;
