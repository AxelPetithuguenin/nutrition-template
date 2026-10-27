import { cn } from "@/lib/utils";

/**
 * Chiffre cle.
 *
 * La valeur est composee en Playfair, grande et fine : un chiffre traite comme
 * un element de mise en page, pas comme une donnee de tableau de bord.
 */
export function StatBlock({
  value,
  label,
  detail,
  tone = "dark",
  align = "left",
  className,
}: {
  value: string;
  label: string;
  /** Precision facultative (methodologie, periode). */
  detail?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "font-display text-[clamp(2.25rem,1.6rem+2.2vw,3.25rem)] leading-none tabular",
          isLight ? "text-white" : "text-ink",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-sm font-medium",
          isLight ? "text-white/85" : "text-ink/80",
        )}
      >
        {label}
      </span>
      {detail && (
        <span className={cn("text-xs", isLight ? "text-white/55" : "text-muted")}>
          {detail}
        </span>
      )}
    </div>
  );
}

export default StatBlock;
