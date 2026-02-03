import type { Variants, Transition } from "framer-motion";

export type SlideDirection = "up" | "down" | "left" | "right";

export interface SlideAnimationConfig {
  direction?: SlideDirection;
  distance?: number;
  duration?: number;
}

export interface SlideAnimationResult {
  variants: Variants;
  transition: Transition;
}

const getDirectionOffset = (
  direction: SlideDirection,
  distance: number
): { x?: number; y?: number } => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
  }
};

export function useSlideAnimation(
  config: SlideAnimationConfig = {}
): SlideAnimationResult {
  const { direction = "up", distance = 20, duration = 0.3 } = config;

  const offset = getDirectionOffset(direction, distance);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...offset,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      ...offset,
    },
  };

  const transition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 25,
    duration,
  };

  return {
    variants,
    transition,
  };
}
