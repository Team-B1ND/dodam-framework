"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ProgressProps } from "../../types/props";
import * as S from "./style";

const SIZE = 70;
const STROKE_WIDTH = 10;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;

const TRANSITION = { duration: 0.25, ease: [0.33, 1, 0.68, 1] } as const;

export const CircularProgress = ({ progress, disabled = false, customStyle = {} }: ProgressProps) => {
  const clampedProgress = useMemo(() => Math.min(100, Math.max(0, progress)), [progress]);
  const strokeDashoffset = CIRCUMFERENCE - (clampedProgress / 100) * CIRCUMFERENCE;
  const strokeColor = disabled ? S.disabledColor : S.activeColor;

  return (
    <S.Wrapper
      $customStyle={customStyle}
      style={{ width: SIZE, height: SIZE }}
      role="progressbar"
      aria-valuenow={clampedProgress}
      aria-valuemin={0}
      aria-valuemax={100}>
      <svg width={SIZE} height={SIZE}>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={S.trackColor}
          strokeWidth={STROKE_WIDTH}
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={strokeColor}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={false}
          animate={{ strokeDashoffset }}
          transition={TRANSITION}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </svg>
    </S.Wrapper>
  );
};
