import { motion, useAnimation } from "framer-motion";
import { PropsWithChildren, useEffect, useRef } from "react";
import { useRouter } from "../hooks/useRouter";
import { FLICK_VELOCITY_THRESHOLD, SWIPE_CLOSE_THRESHOLD } from "../constants";

export const StackScreen = ({ children }: PropsWithChildren) => {
  const {
    stack: { pop },
  } = useRouter();
  const controls = useAnimation();
  const startX = useRef(0);
  const isDragging = useRef(false);
  const exiting = useRef(false);
  const lastX = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    controls.start({
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
  }, [controls]);

  const triggerClose = () => {
    exiting.current = true;
    controls.start({
      x: window.innerWidth,
      transition: { type: "tween", ease: "easeIn", duration: 0.22 },
    });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    controls.stop();
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = e.timeStamp;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = Math.max(0, e.clientX - startX.current);
    controls.set({ x: dx });
    lastX.current = e.clientX;
    lastTime.current = e.timeStamp;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const dx = Math.max(0, e.clientX - startX.current);
    const dt = e.timeStamp - lastTime.current;
    const velocity = dt > 0 ? (e.clientX - lastX.current) / dt : 0;

    if (velocity >= FLICK_VELOCITY_THRESHOLD || dx > window.innerWidth * SWIPE_CLOSE_THRESHOLD) {
      triggerClose();
    } else {
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 400, damping: 35 },
      });
    }
  };

  return (
    <motion.div
      style={{ position: "fixed", inset: 0, touchAction: "none" }}
      animate={controls}
      initial={{ x: "100%" }}
      onAnimationComplete={() => {
        if (exiting.current) pop();
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}>
      {children}
    </motion.div>
  );
};

