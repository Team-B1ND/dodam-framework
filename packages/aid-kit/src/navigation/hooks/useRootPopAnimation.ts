import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Actions, useBridgeResponse } from "../../bridge-kit/web";
import {
  EDGE_SWIPE_ZONE,
  FLICK_VELOCITY_THRESHOLD,
  SWIPE_CLOSE_THRESHOLD,
} from "../constants";

interface Params {
  stackLength: number;
  sendPop: () => void;
}

export const useRootPopAnimation = ({ stackLength, sendPop }: Params) => {
  const containerScale = useMotionValue(0.9);
  const containerAnimating = useRef(true);
  const [closeSignal, setCloseSignal] = useState(0);

  const stackLengthRef = useRef(stackLength);
  const isDraggingRoot = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    stackLengthRef.current = stackLength;
  }, [stackLength]);

  const animateToFull = (onComplete?: () => void) => {
    containerAnimating.current = true;
    animate(containerScale, 1, {
      type: "spring",
      stiffness: 260,
      damping: 26,
      onComplete: () => {
        containerAnimating.current = false;
        onComplete?.();
      },
    });
  };

  const animateToMin = (duration = 0.24, onComplete?: () => void) => {
    containerAnimating.current = true;
    animate(containerScale, 0.9, {
      type: "tween",
      ease: [0.36, 0.66, 0.04, 1],
      duration,
      onComplete: () => {
        containerAnimating.current = false;
        onComplete?.();
      },
    });
  };

  useEffect(() => {
    animateToFull();
  }, []);

  useBridgeResponse(Actions.NAVIGATION_POP, async () => {
    if (stackLengthRef.current === 0) {
      await new Promise<void>((resolve) => {
        animateToMin(0.24, resolve);
        sendPop();
      });
    } else {
      setCloseSignal((prev) => prev + 1);
    }

    return { message: "navigation popped" };
  });

  const onRootPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (stackLengthRef.current > 0) return;
    if (containerAnimating.current) return;
    if (e.clientX > EDGE_SWIPE_ZONE) return;
    isDraggingRoot.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = e.timeStamp;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onRootPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRoot.current) return;
    const width = typeof window !== "undefined" ? window.innerWidth : 400;
    const dx = Math.max(0, e.clientX - startX.current);
    const progress = Math.min(1, dx / (width * SWIPE_CLOSE_THRESHOLD));
    containerScale.set(1 - progress * 0.1);
    lastX.current = e.clientX;
    lastTime.current = e.timeStamp;
  };

  const onRootPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRoot.current) return;
    isDraggingRoot.current = false;

    const width = typeof window !== "undefined" ? window.innerWidth : 400;
    const dx = Math.max(0, e.clientX - startX.current);
    const dt = e.timeStamp - lastTime.current;
    const velocity = dt > 0 ? (e.clientX - lastX.current) / dt : 0;
    const shouldClose =
      velocity >= FLICK_VELOCITY_THRESHOLD ||
      dx > width * SWIPE_CLOSE_THRESHOLD;

    if (shouldClose) {
      animateToMin(0.14, () => {
        sendPop();
        animateToFull();
      });
      return;
    }

    animateToFull();
  };

  return {
    containerScale,
    closeSignal,
    onRootPointerDown,
    onRootPointerMove,
    onRootPointerUp,
  };
};
