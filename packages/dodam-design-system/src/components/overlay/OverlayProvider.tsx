"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (overlays.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [overlays.length]);

  const mount = useCallback((id: string, element: OverlayElement) => {
    setOverlays((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((item) =>
          item.id === id ? { ...item, element } : item
        );
      }
      return [...prev, { id, element }];
    });
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlays((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const contextValue = useMemo(() => ({ mount, unmount }), [mount, unmount]);

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      {mounted &&
        createPortal(
          <>
            {overlays.map(({ id, element }) => (
              <OverlayController key={id} id={id} element={element} />
            ))}
          </>,
          document.body
        )}
    </OverlayContext.Provider>
  );
};
