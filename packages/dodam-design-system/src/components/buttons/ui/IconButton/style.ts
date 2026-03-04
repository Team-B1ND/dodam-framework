import { colors } from "@/colors";
import { shapes } from "@/shapes";
import styled, { CSSObject } from "@emotion/styled";

export const Container = styled.button<{
  $size: number;
  $disabled: boolean;
  $pressed: boolean;
  $customStyle: CSSObject;
}>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.1s linear;

  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: ${shapes.small};

  background-color: ${({ $pressed }) => ($pressed ? colors.fill.secondary : "transparent")};
  color: ${colors.text.secondary};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  @media (hover: hover) {
    &:hover {
      background-color: ${({ $disabled }) => ($disabled ? "transparent" : colors.fill.secondary)};
    }
  }

  ${({ $customStyle }) => $customStyle};
`;
