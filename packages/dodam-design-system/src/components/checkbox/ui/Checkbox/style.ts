import { colors } from "../../../../colors";
import { shapes } from "../../../../shapes";
import styled, { CSSObject } from "@emotion/styled";
import { CheckboxType } from "../../types/checkboxType";
import { CheckboxVariant } from "../../types/props";

export const Container = styled.button<{
  $size: "medium" | "small";
  $selected: string;
  $disabled: string;
  $type: CheckboxType;
  $variant: CheckboxVariant;
  $checkboxCustomStyle: CSSObject;
}>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => ($size === "medium" ? "32px" : "28px")};
  min-width: ${({ $size }) => ($size === "medium" ? "32px" : "28px")};
  aspect-ratio: 1 / 1;
  border-radius: ${shapes.extraSmall};
  opacity: ${({ $disabled }) => ($disabled === "true" ? 0.4 : 1)};
  cursor: ${({ $disabled }) => ($disabled === "true" ? "not-allowed" : "pointer")};
  transition: all 0.1s linear;

  box-shadow: ${({ $selected, $variant }) => {
    if ($variant === "outlined") return "none";
    if ($selected === "true") return "none";
    return `0 0 0 2px ${colors.border.normal} inset`;
  }};

  background-color: ${({ $type, $selected, $variant }) => {
    if ($variant === "outlined") return "transparent";
    if ($selected === "true") {
      return $type === "primary" ? colors.brand.primary : colors.status.error;
    }
    return "transparent";
  }};

  ${({ $checkboxCustomStyle }) => $checkboxCustomStyle};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;