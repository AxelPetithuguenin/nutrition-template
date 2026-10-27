import { siteConfig } from "@/data/site";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/motion/Reveal";

/**
 * Questions frequentes.
 *
 * Les questions alimentent aussi les donnees structurees `FAQPage`
 * (voir `lib/seo.ts`), ce qui permet leur affichage direct dans Google.
 * L'encart lateral `aside` est optionnel et reste visible au defilement.
 */
export function Faq() {
  const faq = siteConfig.sections.faq;
  const hasAside = Boolean(faq.aside);

  return (
    <section id="faq" className="scroll-mt-24 bg-background py-section">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle
              eyebrow={faq.eyebrow}
              title={faq.title}
              subtitle={faq.subtitle}
            />

            {faq.aside && (
              <Reveal delay={0.2} className="mt-10 rounded-theme bg-surface p-8">
                <h3 className="font-display text-xl text-ink">{faq.aside.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{faq.aside.text}</p>
                {faq.aside.cta && (
                  <Button action={faq.aside.cta} className="mt-6" variantOverride="outline" />
                )}
              </Reveal>
            )}
          </div>

          <Reveal className={hasAside ? undefined : "lg:col-span-2"}>
            <Accordion items={faq.items} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default Faq;
