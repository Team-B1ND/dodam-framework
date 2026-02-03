"use client"

import * as S from './style';
import { FilledButtonProps } from "../../index";
import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { usePressAnimation } from "@/animations";

const MotionContainer = motion.create(S.Container);

export const FilledButton = ({
  role = "primary",
  size = "mideum",
  display = "inline",
  disabled = false,
  onClick,
  buttonCustomStyle = {},
  children,
}: PropsWithChildren<Partial<FilledButtonProps>>) => {
  const { whileHover, whileTap, transition } = usePressAnimation({ disabled });

  return (
    <MotionContainer
      $buttonCustomStyle={buttonCustomStyle}
      $disabled={disabled.toString()}
      $role={role}
      $size={size}
      $display={display}
      onClick={onClick}
      whileHover={whileHover}
      whileTap={whileTap}
      transition={transition}
    >
      {children ?? "버튼"}
    </MotionContainer>
  )
}
