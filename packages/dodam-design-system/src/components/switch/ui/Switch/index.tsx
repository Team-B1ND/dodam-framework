"use client";

import { motion } from "framer-motion";
import { SwitchProps } from "../../types/props";
import * as S from "./style";

const MotionThumb = motion.create(S.Thumb);

export const Switch = ({
  checked,
  onChange,
  disabled = false,
  size = "medium",
  customStyle = {},
}: SwitchProps) => (
  <S.Track
    $checked={checked}
    $disabled={disabled}
    $size={size}
    $customStyle={customStyle}
    onClick={disabled ? undefined : onChange}
    role="switch"
    aria-checked={checked}>
    <MotionThumb
      $size={size}
      animate={{ x: checked ? S.getTranslateDistance(size) : 0 }}
      transition={{ duration: 0.15 }}
    />
  </S.Track>
);
