import { siteConfig } from "@/data/site";
import { labels, t } from "@/lib/labels";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/motion/Reveal";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";
import SmartImage from "@/components/ui/SmartImage";
import StarRating from "@/components/ui/StarRating";

/**
 * Avis clients.
 *
 * `averageRating` et `reviewsUrl` sont optionnels : renseignes, ils affichent
 * un bandeau de synthese sous le titre. La note moyenne alimente aussi les
 * donnees structurees (etoiles dans les resultats Google).
 */
export function Testimonials() {
  const testimonials = siteConfig.sections.testimonials;

  return (
    <Section id="testimonials" background="background" containerSize="wide">
      <SectionTitle
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        subtitle={testimonials.subtitle}
      />

      {(testimonials.averageRating || testimonials.reviewsUrl) && (
        <Reveal delay={100} className="mt-8 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-theme border border-border bg-surface px-5 py-3">
            {testimonials.averageRating && (
              <span className="flex items-center gap-2.5">
                <StarRating rating={testimonials.averageRating} size={18} />
                <span className="text-sm font-semibold text-ink">
                  {t(labels.ratingOutOf, {
                    value: testimonials.averageRating.toLocaleString(siteConfig.seo.lang),
                  })}
                </span>
              </span>
            )}

            {testimonials.reviewsUrl && (
              <a
                href={testimonials.reviewsUrl.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
              >
                {testimonials.reviewsUrl.label}
                <Icon name="arrow-up-right" size={16} />
              </a>
            )}
          </div>
        </Reveal>
      )}

      {/* `min-w-0` sur les items : sans lui, un nom ou une date non secable
          elargirait la carte et provoquerait un defilement horizontal. */}
      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * 90} className="h-full min-w-0">
            <figure className="flex h-full flex-col gap-5 rounded-theme border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <Icon name="quote" size={30} className="text-primary/25" />
                {item.rating && <StarRating rating={item.rating} />}
              </div>

              <blockquote className="flex-1 leading-relaxed text-ink">
                {item.quote}
              </blockquote>

              <figcaption className="flex items-center gap-3 border-t border-border pt-5">
                {item.avatar ? (
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-full">
                    <SmartImage image={item.avatar} fill sizes="44px" />
                  </div>
                ) : (
                  // Sans photo : initiale sur fond teinte, coherente avec la charte.
                  <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-on-primary"
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </span>
                )}

                <div className="min-w-0">
                  <p className="font-semibold text-ink">{item.name}</p>
                  <p className="truncate text-sm text-muted">
                    {[item.role, item.city, item.date].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default Testimonials;
