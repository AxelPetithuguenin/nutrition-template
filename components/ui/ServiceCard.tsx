import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import type { ServiceItem } from "@/types/site";

/**
 * Carte d'accompagnement.
 *
 * Au repos, la carte est presque nue : un filet, une icone, un titre. Au
 * survol, le filet se teinte, l'icone s'inverse et la carte se souleve — le
 * detail se revele a l'interaction plutot que de s'imposer d'emblee.
 *
 * Toutes les donnees viennent de `sections.services.items` dans `data/site.ts`.
 */
export function ServiceCard({
  service,
  className,
}: {
  service: ServiceItem;
  className?: string;
}) {
  return (
    <article
      id={`service-${service.id}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-theme border bg-background p-8 sm:p-9",
        "transition-[transform,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-1 hover:border-primary/25 hover:shadow-card-hover",
        service.featured ? "border-primary/25 shadow-card" : "border-border",
        className,
      )}
    >
      {service.featured && service.badge && (
        <span className="absolute top-6 right-6 rounded-full border border-accent/60 px-3.5 py-1 text-[0.6875rem] tracking-[0.12em] text-primary uppercase">
          {service.badge}
        </span>
      )}

      <span
        className={cn(
          "flex size-14 items-center justify-center rounded-full transition-colors duration-700",
          service.featured
            ? "bg-primary text-on-primary"
            : "bg-primary-light text-primary group-hover:bg-primary group-hover:text-on-primary",
        )}
      >
        <Icon name={service.icon} size={24} />
      </span>

      <h3 className="mt-7 text-title text-ink">{service.title}</h3>

      <p className="mt-3 leading-relaxed text-muted">{service.description}</p>

      {service.features && service.features.length > 0 && (
        <ul className="mt-6 flex flex-col gap-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-muted">
              <Icon name="check" size={15} className="mt-1 text-primary/70" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {(service.price || service.duration || service.cta) && (
        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 pt-8">
          <div className="flex items-baseline gap-2.5">
            {service.price && (
              <span className="font-display text-2xl text-ink tabular">{service.price}</span>
            )}
            {service.duration && (
              <span className="text-sm text-muted tabular">· {service.duration}</span>
            )}
          </div>

          {service.cta && <Button action={service.cta} size="sm" variantOverride="ghost" />}
        </div>
      )}

      {/* Filet inferieur qui se deroule au survol. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary/30 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
      />
    </article>
  );
}

export default ServiceCard;
