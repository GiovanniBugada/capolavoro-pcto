import type { Variants, Transition } from 'framer-motion';

export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.83, 0, 0.17, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

export const durations = {
  xs: 0.4,
  sm: 0.6,
  md: 0.8,
  lg: 1.2,
} as const;

export const stagger = {
  tight: 0.06,
  base: 0.08,
  loose: 0.12,
  wide: 0.2,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.md, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.sm, ease: ease.out },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.md, ease: ease.out },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.md, ease: ease.out },
  },
};

export const scaleSpring: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.sm, ease: ease.spring },
  },
};

export const staggerParent = (delayChildren = 0, staggerChildren = stagger.base): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

export const charReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: ease.out },
  },
};

export const transitions = {
  smooth: { duration: durations.md, ease: ease.out } satisfies Transition,
  snap: { duration: durations.xs, ease: ease.inOut } satisfies Transition,
  bounce: { duration: durations.sm, ease: ease.spring } satisfies Transition,
};
