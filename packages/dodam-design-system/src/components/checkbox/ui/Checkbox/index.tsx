"use client";

import { Checkmark } from "@/icons";
import { CheckboxProps, CheckboxDisplay } from "../../index";
import * as S from "./style";
import { motion, AnimatePresence } from "framer-motion";
import { usePressAnimation } from "@/animations";
import { getCheckmarkColor } from "../../utils";
import { CheckboxType } from "../../index";
import { CheckboxVariant } from "../../index";
import { CSSObject } from "@emotion/react";

type ContainerProps = {
  $size: "medium" | "small";
  $selected: string;
  $disabled: string;
  $type: CheckboxType;
  $variant: CheckboxVariant;
  $display: CheckboxDisplay;
  $checkboxCustomStyle: CSSObject;
};

const MotionContainer = motion.create(S.Container) as React.ComponentType<
  ContainerProps &
    React.ComponentPropsWithoutRef<typeof S.Container> &
    React.ComponentProps<typeof motion.button>
>;

export const Checkbox = ({
  size = "medium",
  selected,
  onClick,
  disabled = false,
  type = "primary",
  variant = "filled",
  display = "inline",
  checkboxCustomStyle = {},
}: CheckboxProps) => {
  const { whileTap, transition } = usePressAnimation({ scale: 0.9, disabled });
  const iconSize = size === "medium" ? 20 : 14;
  const checkmarkColor = getCheckmarkColor({
    variant,
    selected,
    disabled,
    type,
  });

  return (
    <MotionContainer
      $size={size}
      $selected={selected.toString()}
      $disabled={disabled.toString()}
      $type={type}
      $variant={variant}
      $display={display}
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
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <Checkmark size={iconSize} color={checkmarkColor} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </MotionContainer>
  );
};
