import { siteConfig } from "@/data/site";
import ArticleCard from "@/components/ui/ArticleCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Section « Journal » : recettes, conseils et articles.
 *
 * Trois publications mises en avant, avec photo, rubrique et temps de lecture.
 * Les articles sont decrits dans `sections.journal.articles` et pointent vers
 * des pages internes ou externes — le template n'impose pas de moteur de blog.
 */
export function Journal() {
  const journal = siteConfig.sections.journal;

  return (
    <section id="journal" className="scroll-mt-24 bg-surface py-section">
      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionTitle
            eyebrow={journal.eyebrow}
            title={journal.title}
            subtitle={journal.subtitle}
            className="max-w-2xl"
          />

          {journal.cta && (
            <Reveal delay={0.2} className="shrink-0">
              <Button action={journal.cta} variantOverride="outline" />
            </Reveal>
          )}
        </div>

        <Stagger as="ul" gap={0.1} className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {journal.articles.map((article) => (
            <StaggerItem as="li" key={article.id} className="min-w-0">
              <ArticleCard article={article} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export default Journal;
