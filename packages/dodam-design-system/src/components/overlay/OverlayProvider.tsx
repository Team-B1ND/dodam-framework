"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OverlayContext, type OverlayElement } from "./OverlayContext";
import { OverlayController } from "./OverlayController";
import * as S from "./style";

const MotionDim = motion.create(S.Dim);

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
  const [isDimVisible, setIsDimVisible] = useState(false);
  const prevOverlayCountRef = useRef(0);
  const closeTopOverlayRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const currentCount = overlays.length;
    const prevCount = prevOverlayCountRef.current;

    if (currentCount > 0 && prevCount === 0) {
      document.body.style.overflow = "hidden";
      setIsDimVisible(true);
    } else if (currentCount === 0 && prevCount > 0) {
      document.body.style.overflow = "";
    }

    prevOverlayCountRef.current = currentCount;

    return () => {
      document.body.style.overflow = "";
    };
  }, [overlays.length]);

  const mount = useCallback((id: string, element: OverlayElement) => {
    setIsDimVisible(true);
    setOverlays([{ id, element }]);
  }, []);

  const unmount = useCallback((id: string) => {
    setOverlays((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const hideDim = useCallback(() => {
    setIsDimVisible(false);
  }, []);

  const setDimClickHandler = useCallback((handler: () => void) => {
    closeTopOverlayRef.current = handler;
  }, []);

  const handleDimClick = useCallback(() => {
    closeTopOverlayRef.current?.();
  }, []);

  const contextValue = useMemo(
    () => ({ mount, unmount, setDimClickHandler, hideDim }),
    [mount, unmount, setDimClickHandler, hideDim]
  );

  const overlayElements = useMemo(
    () =>
      overlays.map(({ id, element }) => (
        <OverlayController key={id} id={id} element={element} />
      )),
    [overlays]
  );

  const hasOverlays = overlays.length > 0;

  return (
    <OverlayContext.Provider value={contextValue}>
      {children}
      {mounted &&
        createPortal(
          <>
            <AnimatePresence>
              {isDimVisible && (
                <MotionDim
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={handleDimClick}
                />
              )}
            </AnimatePresence>
            {hasOverlays && <S.Container>{overlayElements}</S.Container>}
          </>,
          document.body
        )}
    </OverlayContext.Provider>
  );
};
