import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { RouteContext } from "../contexts/route-context";
import {
  EDGE_SWIPE_ZONE,
  FLICK_VELOCITY_THRESHOLD,
  SWIPE_CLOSE_THRESHOLD,
} from "../constants";

interface Props extends PropsWithChildren {
  closeSignal?: number;
  isTop?: boolean;
}

export const StackScreen = ({
  children,
  closeSignal = 0,
  isTop = false,
}: Props) => {
  const ctx = useContext(RouteContext);
  const realPop = ctx.pop;
  const realPush = ctx.push;

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 400;
  const x = useMotionValue(screenWidth);
  const dimOpacity = useTransform(x, [0, screenWidth], [0.4, 0]);

  const animating = useRef(true);

  useEffect(() => {
    animate(x, 0, {
      type: "spring",
      stiffness: 220,
      damping: 26,
      onComplete: () => { animating.current = false; },
    });
  }, [x]);

  const isDragging = useRef(false);
  const exiting = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const closeTargetRef = useRef<string | undefined>(undefined);
  const lastHandledCloseSignal = useRef(closeSignal);

  const triggerClose = useCallback(
    (target?: string, swipeVelocity?: number) => {
      if (animating.current) return;
      closeTargetRef.current = target;
      exiting.current = true;
      animating.current = true;
      if (swipeVelocity !== undefined) {
        animate(x, screenWidth, {
          type: "spring",
          stiffness: 220,
          damping: 26,
          velocity: swipeVelocity,
          onComplete: () => realPop(closeTargetRef.current),
        });
      } else {
        animate(x, screenWidth, {
          type: "tween",
          ease: [0.36, 0.66, 0.04, 1],
          duration: 0.3,
          onComplete: () => realPop(closeTargetRef.current),
        });
      }
    },
    [x, screenWidth, realPop],
  );

  const animatedPop = useCallback(
    (target?: string) => {
      triggerClose(target);
    },
    [triggerClose],
  );

  const animatedPush = useCallback(
    (path: string) => {
      if (animating.current) return;
      realPush(path);
    },
    [realPush],
  );

  useEffect(() => {
    if (!isTop) return;
    if (closeSignal === lastHandledCloseSignal.current) return;
    lastHandledCloseSignal.current = closeSignal;
    triggerClose();
  }, [closeSignal, isTop, triggerClose]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (animating.current) return;
    if (e.clientX > EDGE_SWIPE_ZONE) return;
    x.stop();
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = e.timeStamp;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = Math.max(0, e.clientX - startX.current);
    x.set(dx);
    lastX.current = e.clientX;
    lastTime.current = e.timeStamp;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const dx = Math.max(0, e.clientX - startX.current);
    const dt = e.timeStamp - lastTime.current;
    const velocity = dt > 0 ? (e.clientX - lastX.current) / dt : 0;

    if (
      velocity >= FLICK_VELOCITY_THRESHOLD ||
      dx > screenWidth * SWIPE_CLOSE_THRESHOLD
    ) {
      triggerClose(undefined, velocity * 1000);
    } else {
      animate(x, 0, {
        type: "spring",
        stiffness: 260,
        damping: 28,
        onComplete: () => { animating.current = false; },
      });
    }
  };

  return (
    <RouteContext.Provider value={{ ...ctx, pop: animatedPop, push: animatedPush }}>
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#000",
          opacity: dimOpacity,
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          touchAction: "pan-y",
          x,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}>
        {children}
      </motion.div>
    </RouteContext.Provider>
  );
};
