import { useCallback, useState } from "react";
import type { Variants, Transition } from "framer-motion";

export interface FormAnimationConfig {
  pressScale?: number;
  disabledOpacity?: number;
  disabled?: boolean;
}

export interface FormAnimationResult {
  variants: Variants;
  transition: Transition;
  isPressed: boolean;
  handlers: {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
  };
}

const DEFAULT_PRESS_SCALE = 0.97;
const DEFAULT_DISABLED_OPACITY = 0.5;

export function useFormAnimation(
  config: FormAnimationConfig = {}
): FormAnimationResult {
  const {
    pressScale = DEFAULT_PRESS_SCALE,
    disabledOpacity = DEFAULT_DISABLED_OPACITY,
    disabled = false,
  } = config;

  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    if (!disabled) {
      setIsPressed(true);
    }
  }, [disabled]);

  const handlePressOut = useCallback(() => {
    setIsPressed(false);
  }, []);

  const variants: Variants = {
    idle: {
      scale: 1,
      opacity: disabled ? disabledOpacity : 1,
    },
    pressed: {
      scale: disabled ? 1 : pressScale,
      opacity: disabled ? disabledOpacity : 1,
    },
  };

  const transition: Transition = {
    type: "spring",
    stiffness: 300,
    damping: 20,
  };

  return {
    variants,
    transition,
    isPressed,
    handlers: {
      onMouseDown: handlePressIn,
      onMouseUp: handlePressOut,
      onMouseLeave: handlePressOut,
      onTouchStart: handlePressIn,
      onTouchEnd: handlePressOut,
    },
  };
}
