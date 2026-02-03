import { colors } from "@/colors";
import { shapes } from "@/shapes";
import { typoCss } from "@/typography";
import styled, { CSSObject } from "@emotion/styled";
import { ButtonSizes } from "../../index";

const sizeStyles = {
  large: { padding: "0 28px", height: "48px", radius: shapes.medium, typo: typoCss("Body1", "Medium") },
  mideum: { padding: "0 20px", height: "40px", radius: shapes.small, typo: typoCss("Body2", "Medium") },
  small: { padding: "0 12px", height: "32px", radius: shapes.extraSmall, typo: typoCss("Caption2", "Bold") },
};

export const Container = styled.button<{
  $size: ButtonSizes;
  $disabled: string;
  $pressed: boolean;
  $buttonCustomStyle: CSSObject;
}>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.1s linear;

  padding: ${({ $size }) => sizeStyles[$size].padding};
  height: ${({ $size }) => sizeStyles[$size].height};
  min-height: ${({ $size }) => sizeStyles[$size].height};
  border-radius: ${({ $size }) => sizeStyles[$size].radius};
  ${({ $size }) => sizeStyles[$size].typo};

  background-color: ${({ $pressed }) => ($pressed ? colors.fill.primary : "transparent")};
  color: ${colors.text.secondary};
  opacity: ${({ $disabled }) => ($disabled === "true" ? 0.5 : 1)};

  @media (hover: hover) {
    &:hover {
      background-color: ${colors.fill.primary};
    }
  }

  ${({ $buttonCustomStyle }) => $buttonCustomStyle};
`;