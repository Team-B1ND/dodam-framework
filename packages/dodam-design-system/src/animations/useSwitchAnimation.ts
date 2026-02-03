import type { Variants, Transition } from "framer-motion";

export interface SwitchAnimationConfig {
  trackWidth: number;
  thumbSize: number;
  padding?: number;
}

export interface SwitchAnimationResult {
  thumbVariants: Variants;
  trackVariants: Variants;
  transition: Transition;
}

export function useSwitchAnimation(
  config: SwitchAnimationConfig
): SwitchAnimationResult {
  const { trackWidth, thumbSize, padding = 2 } = config;

  const translateDistance = trackWidth - thumbSize - padding * 2;

  const thumbVariants: Variants = {
    off: {
      x: 0,
    },
    on: {
      x: translateDistance,
    },
  };

  const trackVariants: Variants = {
    off: {
      backgroundColor: "var(--dds-surface-variant, #e0e0e0)",
    },
    on: {
      backgroundColor: "var(--dds-primary, #3b82f6)",
    },
  };

  const transition: Transition = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };

  return {
    thumbVariants,
    trackVariants,
    transition,
  };
}
