import { useRef } from "react";
import { useMotionValue, animate } from "framer-motion";
import { ToastPosition } from "../types/props";

const SWIPE_THRESHOLD = 60;

interface UseToastAnimationOptions {
  position: ToastPosition;
  onDismiss: () => void;
}

export const useToastAnimation = ({ position, onDismiss }: UseToastAnimationOptions) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isDismissing = useRef(false);

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    if (isDismissing.current) return;

    const { offset } = info;
    const shouldDismissX = Math.abs(offset.x) > SWIPE_THRESHOLD;
    const shouldDismissY =
      (position === "top" && offset.y < -SWIPE_THRESHOLD) ||
      (position === "bottom" && offset.y > SWIPE_THRESHOLD);

    if (shouldDismissX) {
      isDismissing.current = true;
      animate(x, offset.x > 0 ? 300 : -300, { duration: 0.2 });
      setTimeout(onDismiss, 200);
    } else if (shouldDismissY) {
      isDismissing.current = true;
      animate(y, position === "top" ? -100 : 100, { duration: 0.2 });
      setTimeout(onDismiss, 200);
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
      animate(y, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  const initialY = position === "top" ? -100 : 100;

  return {
    x,
    y,
    initialY,
    handleDragEnd,
  };
};
