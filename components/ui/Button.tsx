import Link from "next/link";
import { siteConfig } from "@/data/site";
import { isExternalHref, resolveHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import type { CallToAction } from "@/types/site";

/**
 * Styles partages.
 *
 * Le survol ne repose ni sur un changement de couleur brutal ni sur une ombre
 * appuyee : le bouton se souleve d'un pixel et son icone avance. Le mouvement
 * signale l'interaction, la couleur reste stable.
 */
const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[0.01em] " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55";

const VARIANTS = {
  /** Action principale : aplat vert profond. */
  primary: "bg-primary text-on-primary hover:bg-primary-dark shadow-card hover:shadow-card-hover",
  /** Action secondaire : contour fin, fond transparent. */
  outline:
    "border border-primary/25 text-primary hover:border-primary/60 hover:bg-primary/[0.04]",
  /** Action tertiaire : sans contour. */
  ghost: "text-primary hover:bg-primary/[0.06]",
  /** Aplat sable, pour poser une action sur un fond creme. */
  secondary: "bg-secondary/15 text-primary hover:bg-secondary/25",
  /** Sur photo ou fond sombre : aplat clair. */
  light: "bg-background text-primary hover:bg-white shadow-card hover:shadow-float",
  /** Sur photo ou fond sombre : contour clair. */
  "outline-light":
    "border border-white/35 text-white backdrop-blur-[2px] hover:border-white/70 hover:bg-white/10",
} as const;

const SIZES = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-[0.9375rem]",
  lg: "px-9 py-4 text-base",
} as const;

export type ButtonVariant = keyof typeof VARIANTS;

export interface ButtonProps {
  /** Bouton decrit dans `data/site.ts`. */
  action: CallToAction;
  /** Ecrase la variante definie dans la configuration (sections sombres). */
  variantOverride?: ButtonVariant;
  size?: keyof typeof SIZES;
  className?: string;
  /** Occupe toute la largeur disponible (utile en mobile). */
  block?: boolean;
}

/**
 * Bouton / lien d'appel a l'action.
 *
 * La destination est resolue depuis la configuration : `href: "tel"` devient
 * le numero du client, `href: "mailto"` son adresse e-mail. Changer une
 * coordonnee dans `data/site.ts` met donc a jour tous les boutons du site.
 */
export function Button({
  action,
  variantOverride,
  size = "md",
  className,
  block,
}: ButtonProps) {
  const href = resolveHref(action.href, siteConfig.contact);
  const variant = variantOverride ?? action.variant ?? "primary";
  const classes = cn(
    BASE,
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size],
    block && "w-full",
    className,
  );

  const content = (
    <>
      {action.icon && (
        <Icon
          name={action.icon}
          size={17}
          className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:-translate-y-px"
        />
      )}
      <span>{action.label}</span>
      {/* La fleche n'apparait que sur les boutons qui n'ont pas deja une icone :
          elle marque la direction sans surcharger le libelle. */}
      {!action.icon && (
        <Icon
          name="arrow-right"
          size={16}
          className="-mr-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:translate-x-1"
        />
      )}
    </>
  );

  // Liens speciaux et externes : ancre native, hors routeur Next.js.
  const isSpecial = /^(tel:|mailto:)/.test(href);
  const isExternal = action.external || isExternalHref(href);

  if (isSpecial || isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(isExternal && !isSpecial
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export default Button;
