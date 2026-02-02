"use client";

import { useState, useContext, useCallback, useEffect, memo } from "react";
import { OverlayContext, type OverlayElement } from "./OverlayContext";

interface OverlayControllerProps {
  id: string;
  element: OverlayElement;
}

export const OverlayController = memo(({ id, element }: OverlayControllerProps) => {
  const context = useContext(OverlayContext);
  const [isOpen, setIsOpen] = useState(true);

  const close = useCallback(() => {
    setIsOpen(false);
    context?.hideDim();
  }, [context]);

  const exit = useCallback(() => {
    context?.unmount(id);
  }, [context, id]);

  const setDimClickHandler = useCallback(
    (handler: () => void) => {
      context?.setDimClickHandler(handler);
    },
    [context]
  );

  // 기본적으로 dim 클릭 시 close 호출
  useEffect(() => {
    context?.setDimClickHandler(close);
  }, [context, close]);

  return <>{element({ isOpen, close, exit, setDimClickHandler })}</>;
});

OverlayController.displayName = "OverlayController";
