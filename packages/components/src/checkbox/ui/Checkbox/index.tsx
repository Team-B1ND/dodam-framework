"use client";

import { Checkmark } from "@dds-web/iconography/mono";
import { CheckboxProps } from "../../types/props";
import * as S from "./style";
import { colors } from "@dds-web/colors";

export const Checkbox = ({
  size = "medium",
  selected,
  onClick,
  disabled = false,
  type = "primary",
  checkboxCustomStyle = {},
}: CheckboxProps) => {
  return (
    <S.Container
      $size={size}
      $selected={selected.toString()}
      $disabled={disabled.toString()}
      $type={type}
      $checkboxCustomStyle={checkboxCustomStyle}
      onClick={disabled ? () => {} : onClick}
    >
      {selected && (
        <Checkmark
          size={size === "medium" ? 22 : 16}
          color={colors.static.white}
        />
      )}
    </S.Container>
  );
};
