import { cn } from "@/lib/utils";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * En-tete de section : etiquette, titre et chapeau.
 *
 * L'etiquette est precedee d'un filet court plutot que posee dans une pastille
 * coloree : c'est le detail qui separe une mise en page editoriale d'un
 * gabarit generique. Les trois textes viennent de `data/site.ts` ; les champs
 * vides ne sont pas rendus.
 */
export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
  /** `headline` pour une section courante, `display` pour une section pivot. */
  size = "headline",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** `light` sur un fond colore ou une photo. */
  tone?: "dark" | "light";
  className?: string;
  size?: "headline" | "display";
  as?: "h1" | "h2" | "h3";
}) {
  const isLight = tone === "light";
  const centered = align === "center";

  return (
    <Stagger
      gap={0.08}
      className={cn(
        "flex flex-col",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow && (
        <StaggerItem
          className={cn(
            "flex items-center gap-3",
            centered && "justify-center",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "h-px w-8",
              isLight ? "bg-white/40" : "rule-soft",
            )}
          />
          <span
            className={cn(
              "eyebrow",
              isLight ? "text-white/70" : "text-muted",
            )}
          >
            {eyebrow}
          </span>
        </StaggerItem>
      )}

      <StaggerItem className={cn(eyebrow && "mt-5")}>
        <Tag
          className={cn(
            size === "display" ? "text-display" : "text-headline",
            isLight ? "text-white" : "text-ink",
          )}
        >
          {title}
        </Tag>
      </StaggerItem>

      {subtitle && (
        <StaggerItem className="mt-6">
          <p
            className={cn(
              "text-lead measure",
              isLight ? "text-white/75" : "text-muted",
              centered && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </StaggerItem>
      )}
    </Stagger>
  );
}

/**
 * Variante non animee, pour les cas ou l'en-tete est deja dans un conteneur
 * anime (evite d'imbriquer deux declencheurs de defilement).
 */
export function SectionTitleStatic({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex flex-col", className)}>
      {eyebrow && <span className="eyebrow text-muted">{eyebrow}</span>}
      <h2 className="mt-4 text-headline text-ink">{title}</h2>
    </Reveal>
  );
}

export default SectionTitle;
