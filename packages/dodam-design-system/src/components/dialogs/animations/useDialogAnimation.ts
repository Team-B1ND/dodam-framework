import { useCallback, useEffect, useMemo } from "react";
import { useAnimationControls, type AnimationControls, type Transition } from "framer-motion";

export interface DialogAnimationConfig {
  open: boolean;
}

export interface DialogAnimationResult {
  controls: AnimationControls;
  wiggle: () => void;
  modalInitial: { opacity: number; scale: number; x: number };
  modalExit: { opacity: number; scale: number };
  modalTransition: Transition;
}

const MODAL_INITIAL = { opacity: 0, scale: 0.9, x: 0 } as const;
const MODAL_EXIT = { opacity: 0, scale: 0.9 } as const;
const MODAL_TRANSITION: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};
const WIGGLE_ANIMATION = {
  x: [0, 4, -4, 3, -3, 0],
  transition: { duration: 0.25, ease: "easeInOut" as const },
};
const ANIMATE_OPEN = { opacity: 1, scale: 1, x: 0 };

export function useDialogAnimation({
  open,
}: DialogAnimationConfig): DialogAnimationResult {
  const controls = useAnimationControls();

  useEffect(() => {
    if (open) {
      void controls.start(ANIMATE_OPEN);
    }
  }, [open, controls]);

  const wiggle = useCallback(() => {
    void controls.start(WIGGLE_ANIMATION);
  }, [controls]);

  return useMemo(
    () => ({
      controls,
      wiggle,
      modalInitial: MODAL_INITIAL,
      modalExit: MODAL_EXIT,
      modalTransition: MODAL_TRANSITION,
    }),
    [controls, wiggle]
  );
}
