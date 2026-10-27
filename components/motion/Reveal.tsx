"use client";

import { m, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { VIEWPORT, fade, fadeScale, fadeUp } from "@/components/motion/variants";

const PRESETS = { up: fadeUp, fade, scale: fadeScale } as const;

/**
 * Anime l'apparition de son contenu lors du defilement.
 *
 * - L'animation ne se joue qu'une fois, juste avant l'entree dans l'ecran.
 * - Elle est neutralisee si le systeme demande une interface sobre
 *   (`prefers-reduced-motion`) ou si `theme.animations` vaut `false`.
 * - Dans ce cas le contenu reste affiche : l'animation est un supplement,
 *   jamais une condition de visibilite.
 */
export function Reveal({
  children,
  className,
  /** Retard en secondes, pour animer une suite d'elements. */
  delay = 0,
  /** Nature du mouvement. */
  preset = "up",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  preset?: keyof typeof PRESETS;
  as?: "div" | "li" | "article" | "section" | "header" | "figure";
}) {
  const reduced = useReducedMotion();
  const enabled = siteConfig.theme.animations !== false && !reduced;
  const MotionTag = m[Tag];

  if (!enabled) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag
      className={className}
      variants={PRESETS[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
