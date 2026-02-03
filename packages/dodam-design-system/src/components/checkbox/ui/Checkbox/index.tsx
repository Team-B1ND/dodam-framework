"use client";

import { Checkmark } from "@/icons";
import { CheckboxProps } from "../../index";
import * as S from "./style";
import { motion, AnimatePresence } from "framer-motion";
import { usePressAnimation } from "@/animations";
import { getCheckmarkColor } from "../../utils";

const MotionContainer = motion.create(S.Container);

export const Checkbox = ({
  size = "medium",
  selected,
  onClick,
  disabled = false,
  type = "primary",
  variant = "filled",
  checkboxCustomStyle = {},
}: CheckboxProps) => {
  const { whileTap, transition } = usePressAnimation({ scale: 0.9, disabled });
  const iconSize = size === "medium" ? 20 : 14;
  const checkmarkColor = getCheckmarkColor({ variant, selected, disabled, type });

  return (
    <MotionContainer
      $size={size}
      $selected={selected.toString()}
      $disabled={disabled.toString()}
      $type={type}
      $variant={variant}
      $checkboxCustomStyle={checkboxCustomStyle}
      onClick={disabled ? undefined : onClick}
      whileTap={whileTap}
      transition={transition}
    >
      {variant === "outlined" ? (
        <S.IconWrapper>
          <Checkmark size={iconSize} color={checkmarkColor} />
        </S.IconWrapper>
      ) : (
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
              }}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}
            >
              <Checkmark size={iconSize} color={checkmarkColor} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </MotionContainer>
  );
};
