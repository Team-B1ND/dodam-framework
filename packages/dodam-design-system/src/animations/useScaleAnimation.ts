import type { Variants, Transition } from "framer-motion";

export interface ScaleAnimationConfig {
  initialScale?: number;
  targetScale?: number;
  duration?: number;
}

export interface ScaleAnimationResult {
  variants: Variants;
  transition: Transition;
}

export function useScaleAnimation(
  config: ScaleAnimationConfig = {}
): ScaleAnimationResult {
  const { initialScale = 0.9, targetScale = 1, duration = 0.2 } = config;

  const variants: Variants = {
    hidden: {
      scale: initialScale,
      opacity: 0,
    },
    visible: {
      scale: targetScale,
      opacity: 1,
    },
    exit: {
      scale: initialScale,
      opacity: 0,
    },
  };

  const transition: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 25,
    duration,
  };

  return {
    variants,
    transition,
  };
}
