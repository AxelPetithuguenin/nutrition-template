import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Animation d'entree du contenu visible au chargement.
 *
 * Contrairement a `Reveal`, ce composant ne depend pas de React : l'animation
 * est une regle CSS qui se declenche au premier rendu. C'est ce qui permet au
 * titre du hero de s'afficher sans attendre l'hydratation du JavaScript —
 * donc d'obtenir un LCP rapide — et de rester visible meme si le JavaScript
 * ne s'execute pas.
 *
 * A reserver au contenu au-dessus de la ligne de flottaison : plus bas dans
 * la page, `Reveal` reste preferable, car il se declenche a l'entree dans
 * l'ecran plutot qu'au chargement.
 */
export function Entrance({
  children,
  className,
  /** Retard en millisecondes, pour composer une cascade. */
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "li" | "header";
}) {
  const enabled = siteConfig.theme.animations !== false;

  return (
    <Tag
      className={cn(enabled && "entrance", className)}
      style={
        enabled && delay
          ? ({ "--entrance-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}

export default Entrance;
