import type { Transition } from "framer-motion";

export interface PressAnimationConfig {
  scale?: number;
  brightness?: number;
  hoverOpacity?: number;
  disabled?: boolean;
}

export interface PressAnimationResult {
  whileHover: { opacity?: number };
  whileTap: { scale?: number; opacity?: number; filter?: string };
  transition: Transition;
}

const DEFAULT_SCALE = 0.95;
const DEFAULT_BRIGHTNESS = 0.85;
const DEFAULT_HOVER_OPACITY = 0.8;

export function usePressAnimation(
  config: PressAnimationConfig = {}
): PressAnimationResult {
  const {
    scale = DEFAULT_SCALE,
    brightness = DEFAULT_BRIGHTNESS,
    hoverOpacity = DEFAULT_HOVER_OPACITY,
    disabled = false,
  } = config;

  const whileHover = disabled ? {} : { opacity: hoverOpacity };

  const whileTap = disabled
    ? {}
    : { scale, opacity: 1, filter: `brightness(${brightness})` };

  const transition: Transition = {
    type: "tween",
    duration: 0.1,
  };

  return {
    whileHover,
    whileTap,
    transition,
  };
}
