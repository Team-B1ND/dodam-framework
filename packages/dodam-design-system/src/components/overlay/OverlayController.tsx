"use client";

import { useState, useContext, useCallback, memo } from "react";
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

  return <>{element({ isOpen, close, exit, setDimClickHandler })}</>;
});

OverlayController.displayName = "OverlayController";
