import { labels } from "@/lib/labels";
import Container from "@/components/ui/Container";

/** Un bloc de texte d'une page legale. */
export interface LegalBlock {
  title: string;
  paragraphs: string[];
}

/**
 * Gabarit commun aux pages legales (mentions legales, confidentialite).
 * Le contenu est construit a partir de `data/site.ts` par la page appelante :
 * ce composant ne fait que la mise en forme.
 */
export function LegalPage({
  title,
  updatedAt,
  blocks,
}: {
  title: string;
  updatedAt?: string;
  blocks: LegalBlock[];
}) {
  return (
    <article className="bg-background py-16 sm:py-20">
      <Container size="narrow">
        <header className="flex flex-col gap-3 border-b border-border pb-8">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {title}
          </h1>
          {updatedAt && (
            <p className="text-sm text-muted">
              {labels.lastUpdated} : {updatedAt}
            </p>
          )}
        </header>

        <div className="flex flex-col gap-10 pt-10">
          {blocks.map((block) => (
            <section key={block.title} className="flex flex-col gap-3">
              <h2 className="font-display text-xl font-semibold text-ink">
                {block.title}
              </h2>
              {block.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Container>
    </article>
  );
}

export default LegalPage;
