import { cn } from "@/lib/utils";

/**
 * Conteneur centre a largeur maximale.
 *
 * Il fixe la gouttiere laterale de tout le site : un seul endroit a modifier
 * pour respirer plus ou moins. Les largeurs sont volontairement contenues,
 * l'espace vide faisant partie de la mise en page.
 */
export function Container({
  className,
  size = "default",
  children,
}: {
  className?: string;
  /**
   * `prose` pour un bloc de texte seul, `narrow` pour une colonne,
   * `default` pour la plupart des sections, `wide` pour les grilles,
   * `full` pour un contenu bord a bord conservant la gouttiere.
   */
  size?: "prose" | "narrow" | "default" | "wide" | "full";
  children: React.ReactNode;
}) {
  const widths = {
    prose: "max-w-2xl",
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-[82rem]",
    full: "max-w-none",
  } as const;

  return (
    <div
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        widths[size],
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
