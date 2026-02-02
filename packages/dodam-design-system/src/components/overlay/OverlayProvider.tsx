"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { OverlayContext, type OverlayElement } from "./OverlayContext";
import { OverlayController } from "./OverlayController";

interface OverlayItem {
  id: string;
  element: OverlayElement;
}

interface OverlayProviderProps {
  children: React.ReactNode;
}

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [overlays, setOverlays] = useState<OverlayItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const prevOverlayCountRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const currentCount = overlays.length;
    const prevCount = prevOverlayCountRef.current;

    if (currentCount > 0 && prevCount === 0) {
      document.body.style.overflow = "hidden";
    } else if (currentCount === 0 && prevCount > 0) {
      document.body.style.overflow = "";
    }

    prevOverlayCountRef.current = currentCount;

    return () => {
      document.body.style.overflow = "";
    };
  }, [overlays.length]);

  const mount = useCallback((id: string, element: OverlayElement) => {
    setOverlays((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index !== -1) {
        const next = [...prev];
        next[index] = { id, element };
        return next;
      }
      return [...prev, { id, element }];
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlays((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  const overlayElements = useMemo(
    () =>
      overlays.map(({ id, element }) => (
        <OverlayController key={id} id={id} element={element} />
      )),
    [overlays]
  );

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      {mounted && overlays.length > 0 && createPortal(overlayElements, document.body)}
    </OverlayContext.Provider>
  );
};
