"use client";

import { createContext } from "react";

export interface OverlayControllerProps {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
  setDimClickHandler: (handler: () => void) => void;
}

export type OverlayElement = (props: OverlayControllerProps) => React.ReactNode;

export interface OverlayContextValue {
  mount: (id: string, element: OverlayElement) => void;
  unmount: (id: string) => void;
  setDimClickHandler: (handler: () => void) => void;
  hideDim: () => void;
}

export const OverlayContext = createContext<OverlayContextValue | null>(null);
