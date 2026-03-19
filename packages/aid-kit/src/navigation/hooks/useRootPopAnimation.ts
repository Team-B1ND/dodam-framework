import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Actions, useBridgeResponse } from "../../bridge-kit/web";
import {
  EDGE_SWIPE_ZONE,
  FLICK_VELOCITY_THRESHOLD,
} from "../constants";

interface Params {
  stackLength: number;
  sendPop: () => void;
}

export const useRootPopAnimation = ({ stackLength, sendPop }: Params) => {
  const ROOT_SWIPE_CLOSE_THRESHOLD = 0.2;
  const ROOT_SCALE_DELTA = 0.14;
  const ROOT_POP_COOLDOWN_MS = 450;

  const containerScale = useMotionValue(0.9);
  const containerAnimating = useRef(true);
  const rootClosing = useRef(false);
  const lastRootPopAt = useRef(0);
  const [closeSignal, setCloseSignal] = useState(0);

  const stackLengthRef = useRef(stackLength);
  const isDraggingRoot = useRef(false);
  const startX = useRef(0);
  const startTime = useRef(0);

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

  const sendRootPopOnce = () => {
    const now = Date.now();
    if (now - lastRootPopAt.current < ROOT_POP_COOLDOWN_MS) {
      return false;
    }

    lastRootPopAt.current = now;
    sendPop();
    return true;
  };

  useBridgeResponse(Actions.NAVIGATION_POP, async () => {
    if (stackLengthRef.current === 0) {
      if (rootClosing.current) {
        return { message: "navigation pop already in progress" };
      }

      rootClosing.current = true;
      await new Promise<void>((resolve) => {
        animateToMin(0.24, resolve);
      });
      sendRootPopOnce();
      rootClosing.current = false;
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
    startTime.current = e.timeStamp;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onRootPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRoot.current) return;
    const width = typeof window !== "undefined" ? window.innerWidth : 400;
    const dx = Math.max(0, e.clientX - startX.current);
    const progress = Math.min(1, dx / (width * ROOT_SWIPE_CLOSE_THRESHOLD));
    containerScale.set(1 - progress * ROOT_SCALE_DELTA);
  };

  const onRootPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRoot.current) return;
    isDraggingRoot.current = false;
    if ((e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    }

    const width = typeof window !== "undefined" ? window.innerWidth : 400;
    const dx = Math.max(0, e.clientX - startX.current);
    const dt = e.timeStamp - startTime.current;
    const velocity = dt > 0 ? dx / dt : 0;
    const shouldClose =
      velocity >= FLICK_VELOCITY_THRESHOLD ||
      dx > width * ROOT_SWIPE_CLOSE_THRESHOLD;

    if (shouldClose) {
      if (rootClosing.current) {
        return;
      }

      rootClosing.current = true;
      animateToMin(0.14, () => {
        sendRootPopOnce();
        rootClosing.current = false;
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
