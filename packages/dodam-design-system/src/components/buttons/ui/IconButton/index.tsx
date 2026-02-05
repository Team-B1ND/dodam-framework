"use client";

import { ReactNode, useState, useCallback, cloneElement, isValidElement } from "react";
import { CSSObject } from "@emotion/styled";
import { motion } from "framer-motion";
import { usePressAnimation } from "@/animations";
import * as S from "./style";

const MotionContainer = motion.create(S.Container);

export interface IconButtonProps {
  icon: ReactNode;
  size?: number;
  iconSize?: number;
  onClick?: () => void;
  disabled?: boolean;
  customStyle?: CSSObject;
}

export const IconButton = ({
  icon,
  size = 40,
  iconSize,
  onClick,
  disabled = false,
  customStyle = {},
}: IconButtonProps) => {
  const [pressed, setPressed] = useState(false);
  const { whileTap, transition } = usePressAnimation({ disabled });
  const computedIconSize = iconSize ?? Math.floor(size * 0.5);

  const handlePressIn = useCallback(() => {
    if (!disabled) setPressed(true);
  }, [disabled]);

  const handlePressOut = useCallback(() => {
    setPressed(false);
  }, []);

  const renderIcon = () => {
    if (isValidElement<{ size?: number }>(icon)) {
      return cloneElement(icon, { size: computedIconSize });
    }
    return icon;
  };

  return (
    <MotionContainer
      $size={size}
      $disabled={disabled}
      $pressed={pressed}
      $customStyle={customStyle}
      onClick={disabled ? undefined : onClick}
      onMouseDown={handlePressIn}
      onMouseUp={handlePressOut}
      onMouseLeave={handlePressOut}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      whileTap={whileTap}
      transition={transition}
      aria-label="icon button">
      {renderIcon()}
    </MotionContainer>
  );
};
