"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  ITEM_HEIGHT,
  HOURS,
  MINUTES,
  INFINITE_HOURS,
  INFINITE_MINUTES,
  OFFSET,
} from "../constants";
import { Time } from "../types/time";

export const useTimePickerContent = (time: Time, isOpen: boolean = true) => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const snapTimer = useRef<number>(0);
  const isAdjusting = useRef(false);

  const [selected, setSelected] = useState<Time>(time);

  const getMiddleOffset = (value: number, total: number) => {
    return (total + value - OFFSET) * ITEM_HEIGHT;
  };

  useEffect(() => {
    if (!isOpen) return;
    setSelected(time);
    if (hourRef.current) {
      hourRef.current.scrollTop = getMiddleOffset(time.hour, HOURS.length);
    }
    if (minuteRef.current) {
      minuteRef.current.scrollTop = getMiddleOffset(time.minute, MINUTES.length);
    }
  }, [isOpen, time]);

  const handleScroll = useCallback(
    (
      ref: React.RefObject<HTMLDivElement | null>,
      values: number[],
      infiniteValues: number[],
      key: "hour" | "minute"
    ) =>
      () => {
        if (isAdjusting.current || !ref.current) return;

        window.clearTimeout(snapTimer.current);

        snapTimer.current = window.setTimeout(() => {
          if (!ref.current) return;

          const scrollTop = ref.current.scrollTop;
          const index = Math.round(scrollTop / ITEM_HEIGHT) + OFFSET;
          const totalItems = values.length;

          ref.current.scrollTo({
            top: (index - OFFSET) * ITEM_HEIGHT,
            behavior: "smooth",
          });

          const actualValue = infiniteValues[index];

          setSelected((prev) => ({
            ...prev,
            [key]: actualValue,
          }));

          setTimeout(() => {
            if (!ref.current) return;

            const currentScrollTop = ref.current.scrollTop;
            const currentIndex = Math.round(currentScrollTop / ITEM_HEIGHT) + OFFSET;

            if (currentIndex < totalItems || currentIndex >= totalItems * 2) {
              isAdjusting.current = true;
              const middleIndex = totalItems + actualValue;
              ref.current.scrollTop = (middleIndex - OFFSET) * ITEM_HEIGHT;
              isAdjusting.current = false;
            }
          }, 150);
        }, 80);
      },
    []
  );

  return {
    selected,
    hourRef,
    minuteRef,
    handleScroll,
    infiniteHours: INFINITE_HOURS,
    infiniteMinutes: INFINITE_MINUTES,
  };
};
