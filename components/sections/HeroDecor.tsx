import Image from "next/image";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import type { HeroDecoration } from "@/types/site";

/**
 * Visuels décoratifs qui flottent autour du titre.
 *
 * Trois partis pris :
 *  - `aria-hidden` et `alt=""` : ce sont des ornements, pas du contenu ; ils
 *    ne doivent rien ajouter à ce qu'entend un lecteur d'écran ;
 *  - positionnement en pourcentage, pour qu'ils suivent la mise en page à
 *    toutes les largeurs sans point de rupture dédié ;
 *  - animation portée par le CSS, donc active dès le premier rendu et
 *    neutralisée par `prefers-reduced-motion`.
 */
export function HeroDecor({ decorations }: { decorations: HeroDecoration[] }) {
  if (decorations.length === 0) return null;
  const animate = siteConfig.theme.animations !== false;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {decorations.map((deco, index) => (
        <span
          key={`${deco.src}-${index}`}
          className={cn(
            // Sur petit écran, la place manque : les visuels s'effacent
            // derrière le texte plutôt que de le chevaucher.
            "absolute block opacity-40 lg:opacity-100",
            animate && "animate-float",
            deco.desktopOnly && "hidden lg:block",
          )}
          style={{
            top: deco.top,
            bottom: deco.bottom,
            left: deco.left,
            right: deco.right,
            width: deco.width,
            rotate: deco.rotate ? `${deco.rotate}deg` : undefined,
            animationDelay: deco.delay ? `${deco.delay}s` : undefined,
          }}
        >
          <Image
            src={deco.src}
            alt=""
            width={300}
            height={300}
            unoptimized={deco.src.toLowerCase().endsWith(".svg")}
            className="h-auto w-full drop-shadow-[0_18px_28px_rgba(54,65,62,0.10)]"
          />
        </span>
      ))}
    </div>
  );
}

/** Petite étincelle, posée près des visuels pour animer le vide. */
export function Sparkle({
  className,
  size = 18,
  delay = 0,
}: {
  className?: string;
  size?: number;
  delay?: number;
}) {
  const animate = siteConfig.theme.animations !== false;

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={cn("absolute text-secondary", animate && "animate-twinkle", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      <path
        d="M12 2c.7 4.7 2.6 6.6 7.3 7.3-4.7.7-6.6 2.6-7.3 7.3-.7-4.7-2.6-6.6-7.3-7.3C9.4 8.6 11.3 6.7 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default HeroDecor;
