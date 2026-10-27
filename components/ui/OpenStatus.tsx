"use client";

import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "@/lib/hours";
import { cn } from "@/lib/utils";
import type { DaySchedule } from "@/types/site";

/**
 * Pastille "Ouvert / Ferme" calculee a partir des horaires du client.
 *
 * Le calcul depend de l'heure courante : il est volontairement effectue apres
 * le montage du composant, sinon le HTML genere sur le serveur et celui du
 * navigateur differeraient (erreur d'hydratation React).
 * L'etat est rafraichi chaque minute.
 */
export function OpenStatus({
  schedule,
  timezone,
  className,
}: {
  schedule: DaySchedule[];
  timezone?: string;
  className?: string;
}) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState(schedule, timezone));
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [schedule, timezone]);

  // Rien n'est affiche tant que l'etat n'est pas connu : pas de clignotement.
  if (!state) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
        state.isOpen
          ? "bg-primary-light text-primary-dark"
          : "bg-ink/5 text-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-2 rounded-full",
          state.isOpen ? "bg-primary" : "bg-muted",
        )}
      />
      {state.label}
    </span>
  );
}

export default OpenStatus;
