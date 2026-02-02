import { useCallback, useEffect } from "react";
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

export function useDialogAnimation({
  open,
}: DialogAnimationConfig): DialogAnimationResult {
  const controls = useAnimationControls();

  useEffect(() => {
    if (open) {
      void controls.start({ opacity: 1, scale: 1, x: 0 });
    }
  }, [open, controls]);

  const wiggle = useCallback(() => {
    void controls.start({
      x: [0, 4, -4, 3, -3, 0],
      transition: { duration: 0.25, ease: "easeInOut" },
    });
  }, [controls]);

  return {
    controls,
    wiggle,
    modalInitial: { opacity: 0, scale: 0.9, x: 0 },
    modalExit: { opacity: 0, scale: 0.9 },
    modalTransition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  };
}
