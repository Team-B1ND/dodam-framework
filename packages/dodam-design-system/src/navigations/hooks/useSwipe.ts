import { useCallback, useEffect, useRef } from "react";
import { useStackStore } from "../stores/stack";

export const useSwipe = (popStack?: () => void) => {
  const { stack, pop } = useStackStore();
  const topScreenRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<{
    isDragging: boolean;
    startX: number;
    lastX: number;
    startTime: number;
    index: number;
  } | null>(null);

  const handleDragEnd = useCallback(() => {
    if (!dragInfo.current?.isDragging) return;
    const { startX, lastX, startTime } = dragInfo.current;
    const distance = lastX - startX;
    const time = Date.now() - startTime;
    const velocity = distance / time;
    const screenWidth = window.innerWidth;
    const isClosed = distance > screenWidth * 0.35 || velocity > 0.5;
    if (topScreenRef.current) {
      topScreenRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)";
      topScreenRef.current.style.transform = isClosed ? "translateX(100%)" : "";
      if (isClosed) {
        if (popStack) popStack();
        else pop();
      }
    }
    dragInfo.current = null;
  }, [pop, popStack]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragInfo.current?.isDragging) return;
    let clientX;
    if (e.type === "touchmove") {
      clientX = (e as TouchEvent).touches[0].clientX;
    } else {
      clientX = (e as MouseEvent).clientX;
    }

    const distance = clientX - dragInfo.current.startX;
    if (distance < 0) return;

    dragInfo.current.lastX = clientX;
    if (topScreenRef.current) {
      topScreenRef.current.style.transform = `translateX(${distance}px)`;
    }
  }, []);

  const handleDragStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent, index: number) => {
      if (index !== stack.length - 1) return;
      let clientX;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = (e as React.MouseEvent).clientX;
      }

      const screenWidth = window.innerWidth;
      if (clientX > screenWidth * 0.2) return;

      dragInfo.current = {
        isDragging: true,
        startX: clientX,
        lastX: clientX,
        startTime: Date.now(),
        index,
      };
      if (topScreenRef.current) {
        topScreenRef.current.style.transition = "none";
      }

      window.addEventListener("mousemove", handleDragMove);
      window.addEventListener("mouseup", handleDragEnd, { once: true });
      window.addEventListener("touchmove", handleDragMove);
      window.addEventListener("touchend", handleDragEnd, { once: true });
    },
    [stack, handleDragMove, handleDragEnd],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleDragMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  return {
    topScreenRef,
    handleDragStart,
    remove: pop,
  }
};
