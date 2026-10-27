"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { siteConfig } from "@/data/site";

/**
 * Parallaxe discrete : le contenu se deplace plus lentement que la page.
 *
 * L'amplitude est volontairement faible (quelques pour cent de la hauteur) :
 * l'effet doit se ressentir sans jamais se remarquer, et surtout sans decoller
 * l'image de son cadre. Un ressort lisse le mouvement pour eviter l'a-coup
 * des molettes de souris.
 */
export function Parallax({
  children,
  className,
  /** Amplitude du deplacement, en pourcentage de la hauteur de l'element. */
  amount = 8,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const enabled = siteConfig.theme.animations !== false && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], ["0%", `${amount}%`]);
  const y = useSpring(raw, { stiffness: 120, damping: 30, restDelta: 0.001 });

  if (!enabled) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <m.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </m.div>
    </div>
  );
}

export default Parallax;
