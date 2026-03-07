"use client";

import { motion } from "framer-motion";
import { ProgressProps } from "../../types/props";
import * as S from "./style";

const SIZE = 70;
const STROKE_WIDTH = 10;
const CENTER = SIZE / 2;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TRANSFORM = `rotate(-90 ${CENTER} ${CENTER})`;

const TRANSITION = { duration: 0.25, ease: [0.33, 1, 0.68, 1] } as const;
const clamp = (value: number) => Math.min(100, Math.max(0, value));

export const CircularProgress = ({ progress, disabled = false, customStyle = {} }: ProgressProps) => {
  const value = clamp(progress);
  const offset = CIRCUMFERENCE * (1 - value / 100);

  return (
    <S.Wrapper $customStyle={customStyle} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <svg width={SIZE} height={SIZE}>
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke={S.trackColor} strokeWidth={STROKE_WIDTH} />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke={disabled ? S.disabledColor : S.activeColor}
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={false}
          animate={{ strokeDashoffset: offset }}
          transition={TRANSITION}
          transform={TRANSFORM}
        />
      </svg>
    </S.Wrapper>
  );
};
