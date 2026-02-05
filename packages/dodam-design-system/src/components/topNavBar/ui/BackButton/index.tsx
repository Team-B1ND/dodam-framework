"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { usePressAnimation } from "@/animations";
import { ArrowLeft } from "@/icons/mono";
import { colors } from "@/colors";
import { BackButtonProps } from "../../types/props";
import * as S from "./style";

const MotionIconWrapper = motion.create(S.IconWrapper);
const ICON_SIZE = 24;
const ICON_COLOR = colors.text.primary;
const PRESS_SCALE = { scale: 0.9 };

export const BackButton = memo(({ onClick }: BackButtonProps) => {
  const { whileTap, transition } = usePressAnimation(PRESS_SCALE);

  return (
    <S.Container onClick={onClick}>
      <S.Background />
      <MotionIconWrapper whileTap={whileTap} transition={transition}>
        <ArrowLeft size={ICON_SIZE} color={ICON_COLOR} />
      </MotionIconWrapper>
    </S.Container>
  );
});
