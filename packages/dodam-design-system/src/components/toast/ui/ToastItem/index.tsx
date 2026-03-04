"use client";

import { useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { ToastItem as ToastItemType, ToastType } from "../../types/props";
import { useToastAnimation } from "../../hooks/useToastAnimation";
import { CheckmarkCircleFill, XmarkCircle, ExclamationmarkCircle } from "@/icons/mono";
import { colors } from "@/colors";
import * as S from "./style";

const MotionItem = motion.create(S.Item);

const ICON_SIZE = 20;

const TYPE_ICONS: Record<ToastType, ReactNode> = {
  default: null,
  success: <CheckmarkCircleFill size={ICON_SIZE} color={colors.status.success} />,
  error: <XmarkCircle size={ICON_SIZE} color={colors.status.error} />,
  warning: <ExclamationmarkCircle size={ICON_SIZE} color={colors.status.warning} />,
};

interface ToastItemProps {
  item: ToastItemType;
  onRemove: () => void;
}

export const ToastItem = ({ item, onRemove }: ToastItemProps) => {
  const { x, y, initialY, handleDragEnd } = useToastAnimation({
    position: item.position,
    onDismiss: onRemove,
  });

  useEffect(() => {
    if (item.duration <= 0) return;
    const timer = setTimeout(onRemove, item.duration);
    return () => clearTimeout(timer);
  }, [item.duration, onRemove]);

  const icon = item.icon ?? TYPE_ICONS[item.type];

  return (
    <MotionItem
      style={{ x, y }}
      initial={{ opacity: 0, y: initialY, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: initialY, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      drag
      dragElastic={0.5}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}>
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      <S.Message>{item.message}</S.Message>
    </MotionItem>
  );
};
