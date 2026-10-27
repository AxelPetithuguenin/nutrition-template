import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import SmartImage from "@/components/ui/SmartImage";
import StarRating from "@/components/ui/StarRating";
import type { ResultStory } from "@/types/site";

/**
 * Carte de temoignage « avant / apres ».
 *
 * La structure raconte une trajectoire : situation de depart, resultat, puis
 * parole du patient. Le chiffre est mis en avant en Playfair, mais reste
 * secondaire par rapport a la citation — c'est la voix qui convainc, le
 * chiffre ne fait que la situer.
 *
 * Donnees : `sections.results.items` dans `data/site.ts`.
 */
export function TestimonialCard({
  story,
  className,
}: {
  story: ResultStory;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group flex h-full flex-col rounded-theme border border-border bg-background p-8 sm:p-9",
        "transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-primary/20 hover:shadow-card-hover",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <Icon name="quote" size={26} className="text-primary/25" />
        {story.rating && <StarRating rating={story.rating} size={14} />}
      </div>

      {/* Trajectoire : avant -> apres */}
      <div className="mt-7 flex items-stretch gap-4">
        <div className="min-w-0 flex-1">
          <span className="eyebrow text-muted/70">{labels.beforeLabel}</span>
          <p className="mt-2 text-sm leading-relaxed text-muted">{story.before}</p>
        </div>

        <span aria-hidden="true" className="w-px shrink-0 bg-border" />

        <div className="min-w-0 flex-1">
          <span className="eyebrow text-primary/70">{labels.afterLabel}</span>
          <p className="mt-2 text-sm leading-relaxed text-ink">{story.after}</p>
        </div>
      </div>

      {story.metric && (
        <div className="mt-7 flex items-baseline gap-3 rounded-theme bg-primary-light px-5 py-4">
          <span className="font-display text-3xl leading-none text-primary tabular">
            {story.metric.value}
          </span>
          <span className="text-sm text-ink/70">{story.metric.label}</span>
        </div>
      )}

      <blockquote className="mt-7 flex-1 leading-relaxed text-ink">
        « {story.quote} »
      </blockquote>

      <figcaption className="mt-8 flex min-w-0 items-center gap-4 border-t border-border pt-6">
        {story.avatar ? (
          <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
            <SmartImage image={story.avatar} fill sizes="48px" />
          </div>
        ) : (
          // Sans photo : initiale sur aplat teinte, dans l'esprit de la charte.
          <span
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-light font-display text-lg text-primary"
          >
            {story.name.charAt(0).toUpperCase()}
          </span>
        )}

        <div className="min-w-0">
          <p className="font-medium text-ink">{story.name}</p>
          <p className="truncate text-sm text-muted">
            {[story.context, story.duration].filter(Boolean).join(" · ")}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default TestimonialCard;
