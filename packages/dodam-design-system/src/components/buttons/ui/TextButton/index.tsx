"use client"

import * as S from "./style"
import { TextButtonProps } from "../../types/props"
import { PropsWithChildren, useState, useCallback } from "react"
import { motion } from "framer-motion";
import { usePressAnimation } from "../../../../animations";

const MotionContainer = motion.create(S.Container);

export const TextButton = ({
  size = "mideum",
  onClick,
  buttonCustomStyle = {},
  disabled = false,
  children
}: PropsWithChildren<Partial<TextButtonProps>>) => {
  const [pressed, setPressed] = useState(false);
  const { whileTap, transition } = usePressAnimation({ disabled });

  const handlePressIn = useCallback(() => {
    if (!disabled) setPressed(true);
  }, [disabled]);

  const handlePressOut = useCallback(() => {
    setPressed(false);
  }, []);

  return (
    <MotionContainer
      $buttonCustomStyle={buttonCustomStyle}
      $disabled={disabled.toString()}
      $size={size}
      $pressed={pressed}
      onClick={onClick}
      onMouseDown={handlePressIn}
      onMouseUp={handlePressOut}
      onMouseLeave={handlePressOut}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}
      whileTap={whileTap}
      transition={transition}
    >
      {children ?? "버튼"}
    </MotionContainer>
  );
}
