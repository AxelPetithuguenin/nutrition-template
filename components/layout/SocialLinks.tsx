import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";

/**
 * Icones des reseaux sociaux.
 * La liste vient de `social` dans `data/site.ts` : retirer une entree suffit
 * a faire disparaitre l'icone partout ou ce composant est utilise.
 */
export function SocialLinks({
  tone = "dark",
  size = 18,
  className,
}: {
  tone?: "dark" | "light";
  size?: number;
  className?: string;
}) {
  const links = siteConfig.social;
  if (links.length === 0) return null;

  const isLight = tone === "light";

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className={cn(
              "flex size-11 items-center justify-center rounded-full border transition-[color,background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px",
              isLight
                ? "border-white/15 text-white/70 hover:border-white/45 hover:text-white"
                : "border-border text-muted hover:border-primary hover:bg-primary hover:text-on-primary",
            )}
          >
            <Icon name={link.icon} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
