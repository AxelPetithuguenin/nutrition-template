import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";

/**
 * Enveloppe standard d'une section de page.
 *
 * Centralise l'ancre (`id`), le fond et la cadence verticale. Toutes les
 * sections partagent ainsi exactement le meme rythme, ce qui donne au site
 * sa regularite : c'est l'espace, plus que les effets, qui porte ici la
 * sensation de qualite.
 */
export function Section({
  id,
  background = "background",
  size = "default",
  containerSize,
  className,
  children,
}: {
  /** Ancre utilisee par le menu (`#services`). */
  id?: string;
  /** Fond de la section. */
  background?: "background" | "surface" | "primary" | "secondary" | "tint";
  /** Densite verticale. */
  size?: "compact" | "default";
  containerSize?: "prose" | "narrow" | "default" | "wide" | "full";
  className?: string;
  children: React.ReactNode;
}) {
  const backgrounds = {
    background: "bg-background text-ink",
    surface: "bg-surface text-ink",
    tint: "bg-primary-light text-ink",
    primary: "bg-primary text-on-primary",
    secondary: "bg-secondary text-on-primary",
  } as const;

  const paddings = {
    compact: "py-section-sm",
    default: "py-section",
  } as const;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24",
        backgrounds[background],
        paddings[size],
        className,
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}

export default Section;
