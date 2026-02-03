"use client";

import { useState, useCallback, type RefObject } from "react";

const OPTION_HEIGHT = 32;
const MAX_HEIGHT = 200;
const PADDING = 8;

export const useDropdownPosition = (
  containerRef: RefObject<HTMLDivElement | null>,
  optionsCount: number
) => {
  const [dropUp, setDropUp] = useState(false);

  const calculatePosition = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const optionsHeight = Math.min(
      optionsCount * OPTION_HEIGHT + PADDING,
      MAX_HEIGHT
    );

    const spaceBelow = windowHeight - rect.bottom;
    const spaceAbove = rect.top;

    setDropUp(spaceBelow < optionsHeight && spaceAbove > spaceBelow);
  }, [containerRef, optionsCount]);

  return { dropUp, calculatePosition };
};
