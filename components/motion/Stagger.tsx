"use client";

import { m, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { VIEWPORT, fadeUp, staggerContainer } from "@/components/motion/variants";

/**
 * Anime une liste d'elements en cascade.
 *
 * `Stagger` porte le rythme, `StaggerItem` porte le mouvement : cela evite de
 * calculer un retard different pour chaque carte d'une grille.
 *
 * @example
 * <Stagger as="ul" className="grid gap-6">
 *   {items.map((item) => <StaggerItem as="li" key={item.id}>…</StaggerItem>)}
 * </Stagger>
 */
export function Stagger({
  children,
  className,
  /** Intervalle entre deux enfants, en secondes. */
  gap = 0.09,
  /** Retard avant le premier enfant. */
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const reduced = useReducedMotion();
  const enabled = siteConfig.theme.animations !== false && !reduced;
  const MotionTag = m[Tag];

  if (!enabled) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag
      className={className}
      variants={staggerContainer(gap, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

/** Element anime a l'interieur d'un `Stagger`. */
export function StaggerItem({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
}) {
  const reduced = useReducedMotion();
  const enabled = siteConfig.theme.animations !== false && !reduced;
  const MotionTag = m[Tag];

  if (!enabled) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  );
}

export default Stagger;
