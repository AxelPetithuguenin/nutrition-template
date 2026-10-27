import type { Transition, Variants } from "framer-motion";

/**
 * Vocabulaire d'animation commun a tout le site.
 *
 * Un seul jeu de courbes et de durees : c'est ce qui donne l'impression
 * d'un mouvement unifie plutot que d'effets ajoutes section par section.
 */

/** Courbe d'attenuation utilisee partout : demarrage franc, arrivee posee. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Transition de base. */
export const TRANSITION: Transition = {
  duration: 0.7,
  ease: EASE,
};

/** Apparition depuis le bas : le mouvement par defaut des sections. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: TRANSITION },
};

/** Apparition sans deplacement, pour les grands visuels. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { ...TRANSITION, duration: 1 } },
};

/** Leger agrandissement, reserve aux images et aux cartes. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { ...TRANSITION, duration: 0.9 } },
};

/** Conteneur d'une cascade : anime ses enfants l'un apres l'autre. */
export function staggerContainer(stagger = 0.09, delay = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/** Fenetre de declenchement : l'element s'anime une fois, un peu avant d'entrer. */
export const VIEWPORT = { once: true, amount: 0.2, margin: "0px 0px -80px 0px" } as const;
