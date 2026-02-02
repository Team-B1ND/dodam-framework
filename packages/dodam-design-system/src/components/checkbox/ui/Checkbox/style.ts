import { colors } from "../../../../colors";
import styled, { CSSObject } from "@emotion/styled";
import { CheckboxType } from "../../types/checkboxType";

export const Container = styled.button<{
  $size: "medium" | "small"
  $selected: string;
  $disabled: string;
  $type: CheckboxType;
  $checkboxCustomStyle: CSSObject;
}>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => 
    $size === "medium" ? "32px" 
    : $size === "small" ? "28px" 
    : ""};
  min-width: ${({ $size }) => 
    $size === "medium" ? "32px" 
    : $size === "small" ? "28px" 
    : ""};
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  opacity: ${({ $disabled }) => 
    $disabled === "true" ? "0.5" 
    : $disabled === "false" ? "1" 
    : ""};
  box-shadow: ${({ $selected }) => 
    $selected === "true" ? "none" 
    : $selected === "false" ? `0 0 0 3px ${colors.border.strong} inset`
    : ""};
  background-color: ${({ $type, $selected }) => 
    $selected === "true" ? (
    $type === "primary" ? colors.brand.primary 
    : $type === "error" ? colors.status.error 
    : "") : "transparent"};
  cursor: ${({ $disabled }) => $disabled === "true" ? "not-allowed" : "pointer"};

  transition: all 0.1s linear;
  &:hover {
    opacity: ${({ $disabled }) => 
      $disabled === "true" ? "0.5" 
      : $disabled === "false" ? "0.8" 
      : ""};
  }

  ${({ $checkboxCustomStyle }) => $checkboxCustomStyle};
`