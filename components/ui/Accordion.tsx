"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/variants";
import { cn, toParagraphs } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import type { FaqItem } from "@/types/site";

/**
 * Liste de questions / reponses depliables.
 *
 * Accessibilite : chaque question est un vrai bouton relie a sa reponse par
 * `aria-controls` / `aria-expanded`, et le panneau ferme est retire du DOM —
 * son contenu n'est donc ni lu par un lecteur d'ecran ni atteignable au clavier.
 *
 * Animation : la hauteur est animee de `auto` a zero par Framer Motion, ce qui
 * evite le calcul manuel de hauteur. Elle est neutralisee sous
 * `prefers-reduced-motion`, ou l'ouverture devient instantanee.
 */
export function Accordion({
  items,
  /** Index de la question ouverte au chargement (`null` pour tout fermer). */
  defaultOpen = 0,
  className,
}: {
  items: FaqItem[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.id} className="border-b border-border first:border-t">
            <h3>
              <button
                type="button"
                id={`faq-button-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-7 text-left"
              >
                <span
                  className={cn(
                    "font-display text-lg transition-colors duration-500 sm:text-xl",
                    isOpen ? "text-primary" : "text-ink group-hover:text-primary",
                  )}
                >
                  {item.question}
                </span>

                {/* Signe + qui pivote en − : plus discret qu'un chevron. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                    isOpen
                      ? "border-primary bg-primary text-on-primary"
                      : "border-border text-primary group-hover:border-primary/50",
                  )}
                >
                  <m.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                    className="flex"
                  >
                    <Icon name={isOpen ? "minus" : "plus"} size={15} />
                  </m.span>
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  key="panel"
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-button-${item.id}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { height: { duration: 0.5, ease: EASE }, opacity: { duration: 0.35 } }
                  }
                  className="overflow-hidden"
                >
                  <div className="measure flex flex-col gap-4 pr-10 pb-8">
                    {toParagraphs(item.answer).map((paragraph, i) => (
                      <p key={i} className="leading-[1.75] text-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
