"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toastManager } from "../../core/toastManager";
import { ToastItem as ToastItemType, ToastPosition } from "../../types/props";
import { ToastItem } from "../ToastItem";
import * as S from "./style";

export const ToastProvider = () => {
  const [toasts, setToasts] = useState<ToastItemType[]>([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return () => { unsubscribe(); };
  }, []);

  const topToasts = toasts.filter((t) => t.position === "top");
  const bottomToasts = toasts.filter((t) => t.position === "bottom");

  const renderToasts = (items: ToastItemType[], position: ToastPosition) => (
    <S.Container $position={position}>
      <AnimatePresence>
        {items.map((item) => (
          <ToastItem key={item.id} item={item} onRemove={() => toastManager.hide(item.id)} />
        ))}
      </AnimatePresence>
    </S.Container>
  );

  return (
    <>
      {renderToasts(topToasts, "top")}
      {renderToasts(bottomToasts, "bottom")}
    </>
  );
};
