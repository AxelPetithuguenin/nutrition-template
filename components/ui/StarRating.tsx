import { labels, t } from "@/lib/labels";
import { cn } from "@/lib/utils";

/**
 * Note affichee sous forme d'etoiles.
 * Les etoiles pleines utilisent la couleur d'accent de la charte client.
 */
export function StarRating({
  rating,
  size = 16,
  className,
}: {
  /** Note de 0 a 5 (les demi-points sont arrondis a l'entier superieur). */
  rating: number;
  size?: number;
  className?: string;
}) {
  const rounded = Math.round(rating);

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={t(labels.ratingAria, { value: rating })}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={index < rounded ? "text-gold-strong" : "text-border"}
          fill="currentColor"
        >
          <path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.7l5.8-.8L12 3.6Z" />
        </svg>
      ))}
    </div>
  );
}

export default StarRating;
