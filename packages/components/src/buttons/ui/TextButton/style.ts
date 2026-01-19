import { shapes } from "@dds-web/shapes";
import { typoCss } from "@dds-web/typography";
import styled, { CSSObject } from "@emotion/styled";
import { ButtonSizes } from "../../types/buttonSize";

export const Container = styled.button<{
  $size: ButtonSizes;
  $disabled: string;
  $buttonCustomStyle: CSSObject;
}>`
  all: unset;
  ${({ $buttonCustomStyle }) => $buttonCustomStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $size }) =>
    $size === "large" ? "0 28px" 
    : $size === "mideum" ? "0 20px" 
    : $size === "small" ? "0 12px"
    : ""};
  border-radius: ${({ $size }) =>
    $size === "large" ? shapes.medium
    : $size === "mideum" ? shapes.small
    : $size === "small" ? shapes.extraSmall 
    : ""};
  opacity: ${({ $disabled }) => ($disabled === "true" ? 0.5 : 1)};
  min-height: ${({ $size }) => 
    $size === "large" ? "48px" 
    : $size === "mideum" ? "40px" 
    : $size === "small" ? "32px" 
    : ""};
  height: ${({ $size }) => 
    $size === "large" ? "48px" 
    : $size === "mideum" ? "40px" 
    : $size === "small" ? "32px" 
    : ""};
  cursor: pointer;
  
  transition: all 0.1s linear;
  &:hover{
    opacity: ${({ $disabled }) => ($disabled === "true" ? 0.5 : 0.7)};
  }

  ${({ $size }) => 
      $size === "large" ? typoCss("Body1", "Medium") 
    : $size === "mideum" ? typoCss("Body2", "Medium") 
    : $size === "small" ? typoCss("Caption2", "Bold") 
    : ""};
`;