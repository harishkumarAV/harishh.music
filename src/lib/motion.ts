import type { Transition, Variants } from "framer-motion";

export const appleEase = [0.25, 0.1, 0.25, 1] as const;

export const appleTween: Transition = {
  duration: 0.85,
  ease: appleEase,
};

export const fadeUp = (reduce: boolean | null, delay = 0): Variants => ({
  hidden: reduce ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 36, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ...appleTween, delay },
  },
});

export const fadeScale = (reduce: boolean | null, delay = 0): Variants => ({
  hidden: reduce
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 0, y: 28, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...appleTween, delay },
  },
});

export const stagger = (reduce: boolean | null, staggerChildren = 0.1): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduce ? 0 : staggerChildren,
      delayChildren: reduce ? 0 : 0.08,
    },
  },
});
