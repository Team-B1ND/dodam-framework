"use client";

import { motion } from "framer-motion";
import { ProgressProps } from "../../types/props";
import * as S from "./style";

const MotionBar = motion.create(S.Bar);
const TRANSITION = { duration: 0.25, ease: [0.33, 1, 0.68, 1] } as const;
const clamp = (value: number) => Math.min(100, Math.max(0, value));

export const Progress = ({ progress, disabled = false, customStyle = {} }: ProgressProps) => {
  const value = clamp(progress);

  return (
    <S.Container
      $customStyle={customStyle}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}>
      <MotionBar $disabled={disabled} initial={false} animate={{ width: `${value}%` }} transition={TRANSITION} />
    </S.Container>
  );
};
