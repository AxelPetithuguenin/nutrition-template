import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/motion/Reveal";
import type { StatItem } from "@/types/site";

/**
 * Bandeau de chiffres cles (annees d'experience, clients, note...).
 * Alimente par `stats` dans les sections Hero et A propos.
 */
export function Stats({
  items,
  tone = "dark",
  className,
}: {
  items: StatItem[];
  /** `light` sur un fond colore ou une photo. */
  tone?: "dark" | "light";
  className?: string;
}) {
  if (items.length === 0) return null;
  const isLight = tone === "light";

  return (
    <dl className={cn("grid gap-6 sm:grid-cols-3", className)}>
      {items.map((item, index) => (
        <Reveal key={item.label} delay={index * 90} className="flex min-w-0 items-center gap-3">
          {item.icon && (
            <span
              className={cn(
                "flex size-11 shrink-0 items-center justify-center rounded-theme",
                isLight ? "bg-white/15 text-white" : "bg-primary-light text-primary",
              )}
            >
              <Icon name={item.icon} size={20} />
            </span>
          )}
          <div>
            <dt className="sr-only">{item.label}</dt>
            <dd>
              <span
                className={cn(
                  "block font-display text-2xl font-semibold",
                  isLight ? "text-white" : "text-ink",
                )}
              >
                {item.value}
              </span>
              <span
                className={cn(
                  "block text-sm",
                  isLight ? "text-white/75" : "text-muted",
                )}
              >
                {item.label}
              </span>
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}

export default Stats;
