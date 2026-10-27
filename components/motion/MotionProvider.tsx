"use client";

import { LazyMotion, domAnimation } from "framer-motion";

/**
 * Charge le moteur d'animation une seule fois, pour toute l'application.
 *
 * `LazyMotion` + `domAnimation` n'embarque que les fonctionnalites utilisees
 * ici (opacite, deplacement, echelle, survol, defilement) : environ 5 ko
 * au lieu du paquet complet de Framer Motion. C'est ce qui permet de garder
 * des animations partout sans peser sur le score de performance.
 *
 * Conséquence : les composants animes utilisent `m.div` et non `motion.div`.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

export default MotionProvider;
