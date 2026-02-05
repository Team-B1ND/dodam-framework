"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ProgressProps } from "../../types/props";
import * as S from "./style";

const MotionBar = motion.create(S.Bar);

const TRANSITION = { duration: 0.25, ease: [0.33, 1, 0.68, 1] } as const;

export const Progress = ({ progress, disabled = false, customStyle = {} }: ProgressProps) => {
  const clampedProgress = useMemo(() => Math.min(100, Math.max(0, progress)), [progress]);

  return (
    <S.Container
      $customStyle={customStyle}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}>
      <MotionBar
        $disabled={disabled}
        initial={false}
        animate={{ width: `${clampedProgress}%` }}
        transition={TRANSITION}
      />
    </S.Container>
  );
};
