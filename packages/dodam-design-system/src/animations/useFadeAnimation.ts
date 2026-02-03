import type { Variants, Transition } from "framer-motion";

export interface FadeAnimationConfig {
  duration?: number;
  delay?: number;
}

export interface FadeAnimationResult {
  variants: Variants;
  transition: Transition;
}

export function useFadeAnimation(
  config: FadeAnimationConfig = {}
): FadeAnimationResult {
  const { duration = 0.2, delay = 0 } = config;

  const variants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const transition: Transition = {
    duration,
    delay,
    ease: "easeInOut",
  };

  return {
    variants,
    transition,
  };
}
