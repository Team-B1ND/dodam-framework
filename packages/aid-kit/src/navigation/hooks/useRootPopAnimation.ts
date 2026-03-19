import { animate, useMotionValue } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type TouchEvent,
} from "react";
import { Actions, useBridgeResponse } from "../../bridge-kit/web";
import {
  EDGE_SWIPE_ZONE,
  ROOT_POP_BRIDGE_DURATION,
  ROOT_POP_COOLDOWN_MS,
  ROOT_POP_FALLBACK_VIEWPORT_WIDTH,
  ROOT_POP_FLICK_VELOCITY_THRESHOLD,
  ROOT_POP_MIN_FLICK_DISTANCE,
  ROOT_POP_SCALE_DELTA,
  ROOT_POP_SWIPE_CLOSE_THRESHOLD,
  ROOT_POP_SWIPE_DURATION,
} from "../constants";

interface Params {
  stackLength: number;
  sendPop: () => void;
}

type InputType = "pointer" | "touch";

interface GestureState {
  active: boolean;
  input: InputType | null;
  startX: number;
  startTime: number;
  lastX: number;
  lastTime: number;
}

interface RuntimeState {
  isAnimating: boolean;
  isClosing: boolean;
  lastPopAt: number;
  preferTouchInput: boolean;
}

export const useRootPopAnimation = ({ stackLength, sendPop }: Params) => {
  const containerScale = useMotionValue(0.9);
  const [closeSignal, setCloseSignal] = useState(0);

  const stackLengthRef = useRef(stackLength);
  const runtimeRef = useRef<RuntimeState>({
    isAnimating: true,
    isClosing: false,
    lastPopAt: 0,
    preferTouchInput:
      typeof navigator !== "undefined" && navigator.maxTouchPoints > 0,
  });
  const gestureRef = useRef<GestureState>({
    active: false,
    input: null,
    startX: 0,
    startTime: 0,
    lastX: 0,
    lastTime: 0,
  });

  useEffect(() => {
    stackLengthRef.current = stackLength;
  }, [stackLength]);

  const viewportWidth = () => {
    return typeof window !== "undefined"
      ? window.innerWidth
      : ROOT_POP_FALLBACK_VIEWPORT_WIDTH;
  };

  const animateToFull = (onComplete?: () => void) => {
    runtimeRef.current.isAnimating = true;
    animate(containerScale, 1, {
      type: "spring",
      stiffness: 260,
      damping: 26,
      onComplete: () => {
        runtimeRef.current.isAnimating = false;
        onComplete?.();
      },
    });
  };

  const animateToMin = (
    duration = ROOT_POP_BRIDGE_DURATION,
    onComplete?: () => void,
  ) => {
    runtimeRef.current.isAnimating = true;
    animate(containerScale, 0.9, {
      type: "tween",
      ease: [0.36, 0.66, 0.04, 1],
      duration,
      onComplete: () => {
        runtimeRef.current.isAnimating = false;
        onComplete?.();
      },
    });
  };

  useEffect(() => {
    animateToFull();
  }, []);

  const sendRootPopOnce = () => {
    const now = Date.now();
    if (now - runtimeRef.current.lastPopAt < ROOT_POP_COOLDOWN_MS) {
      return false;
    }

    runtimeRef.current.lastPopAt = now;
    sendPop();
    return true;
  };

  const resetGesture = () => {
    gestureRef.current.active = false;
    gestureRef.current.input = null;
  };

  const tryStartGesture = (
    input: InputType,
    clientX: number,
    timeStamp: number,
  ) => {
    if (gestureRef.current.active) return false;
    if (stackLengthRef.current > 0) return false;
    if (runtimeRef.current.isAnimating) return false;
    if (runtimeRef.current.isClosing) return false;
    if (clientX > EDGE_SWIPE_ZONE) return false;

    gestureRef.current = {
      active: true,
      input,
      startX: clientX,
      startTime: timeStamp,
      lastX: clientX,
      lastTime: timeStamp,
    };
    return true;
  };

  const updateGesture = (clientX: number, timeStamp: number) => {
    if (!gestureRef.current.active) return;

    gestureRef.current.lastX = clientX;
    gestureRef.current.lastTime = timeStamp;

    const dx = Math.max(0, clientX - gestureRef.current.startX);
    const progress = Math.min(1, dx / (viewportWidth() * ROOT_POP_SWIPE_CLOSE_THRESHOLD));
    containerScale.set(1 - progress * ROOT_POP_SCALE_DELTA);
  };

  const triggerRootClose = (duration: number) => {
    if (runtimeRef.current.isClosing) return;

    runtimeRef.current.isClosing = true;
    animateToMin(duration, () => {
      sendRootPopOnce();
      runtimeRef.current.isClosing = false;
    });
  };

  const finishGesture = (clientX: number, timeStamp: number) => {
    if (!gestureRef.current.active) return;

    const finalX = Math.max(clientX, gestureRef.current.lastX);
    const finalTime = Math.max(timeStamp, gestureRef.current.lastTime);
    const dx = Math.max(0, finalX - gestureRef.current.startX);
    const dt = finalTime - gestureRef.current.startTime;
    const velocity = dt > 0 ? dx / dt : 0;
    const canFlickClose = dx >= ROOT_POP_MIN_FLICK_DISTANCE;
    const shouldClose =
      (canFlickClose && velocity >= ROOT_POP_FLICK_VELOCITY_THRESHOLD) ||
      dx > viewportWidth() * ROOT_POP_SWIPE_CLOSE_THRESHOLD;

    resetGesture();

    if (shouldClose) {
      triggerRootClose(ROOT_POP_SWIPE_DURATION);
      return;
    }

    animateToFull();
  };

  useBridgeResponse(Actions.NAVIGATION_POP, async () => {
    if (stackLengthRef.current === 0) {
      if (runtimeRef.current.isClosing) {
        return { message: "navigation pop already in progress" };
      }

      runtimeRef.current.isClosing = true;
      await new Promise<void>((resolve) => {
        animateToMin(ROOT_POP_BRIDGE_DURATION, resolve);
      });
      sendRootPopOnce();
      runtimeRef.current.isClosing = false;
    } else {
      setCloseSignal((prev) => prev + 1);
    }

    return { message: "navigation popped" };
  });

  const onRootPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (runtimeRef.current.preferTouchInput) return;
    if (!tryStartGesture("pointer", e.clientX, e.timeStamp)) return;

    const target = e.currentTarget as HTMLElement;
    if (typeof target.setPointerCapture === "function") {
      try {
        target.setPointerCapture(e.pointerId);
      } catch {}
    }
  };

  const onRootPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (runtimeRef.current.preferTouchInput) return;
    if (gestureRef.current.input !== "pointer") return;
    updateGesture(e.clientX, e.timeStamp);
  };

  const onRootPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (runtimeRef.current.preferTouchInput) return;
    if (gestureRef.current.input !== "pointer") return;

    const target = e.currentTarget as HTMLElement;
    if (
      typeof target.hasPointerCapture === "function" &&
      typeof target.releasePointerCapture === "function"
    ) {
      try {
        if (target.hasPointerCapture(e.pointerId)) {
          target.releasePointerCapture(e.pointerId);
        }
      } catch {}
    }

    finishGesture(e.clientX, e.timeStamp);
  };

  const onRootTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (gestureRef.current.input === "pointer") return;

    const touch = e.touches[0];
    if (!touch) return;
    if (!tryStartGesture("touch", touch.clientX, e.timeStamp)) return;
  };

  const onRootTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (gestureRef.current.input !== "touch") return;

    const touch = e.touches[0];
    if (!touch) return;
    updateGesture(touch.clientX, e.timeStamp);
    e.preventDefault();
  };

  const onRootTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (gestureRef.current.input !== "touch") return;

    const touch = e.changedTouches[0];
    if (!touch) {
      resetGesture();
      animateToFull();
      return;
    }

    finishGesture(touch.clientX, e.timeStamp);
  };

  const onRootTouchCancel = () => {
    if (gestureRef.current.input !== "touch") return;
    resetGesture();
    animateToFull();
  };

  return {
    containerScale,
    closeSignal,
    onRootPointerDown,
    onRootPointerMove,
    onRootPointerUp,
    onRootTouchStart,
    onRootTouchMove,
    onRootTouchEnd,
    onRootTouchCancel,
  };
};
