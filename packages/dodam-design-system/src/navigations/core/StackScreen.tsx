"use client";

import { forwardRef, useEffect, useState } from "react";
import * as S from "../styles";
import { NavigationProps } from "./types";

export const StackScreen = forwardRef<
  HTMLDivElement,
  {
    item: NavigationProps;
    index: number;
    totalCount: number;
    isExiting: boolean;
    onExitComplete: () => void;
    onDragStart: (e: TouchEvent | MouseEvent, index: number) => void;
    safeArea: { top: number; bottom: number };
    [key: string]: any;
  }
>(({ item, index, totalCount, isExiting, onExitComplete, onDragStart, safeArea, ...rest }, ref) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        onExitComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isExiting, onExitComplete]);

  const isTop = index === totalCount - 1;

  return (
    <S.Container
      ref={ref}
      onTouchStart={(e) => onDragStart(e, index)}
      onMouseDown={(e) => onDragStart(e, index)}
      $isTop={isTop}
      $index={index}
      $isExiting={isExiting}
      $isMounted={isMounted}
      $top={safeArea?.top || 0}
      $bottom={safeArea?.bottom || 0}
      {...rest}>
      {item.element}
    </S.Container>
  );
});
