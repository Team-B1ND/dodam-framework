import { colors } from "@/colors";
import styled, { CSSObject } from "@emotion/styled";

export const Wrapper = styled.div<{ $customStyle: CSSObject }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $customStyle }) => $customStyle};
`;

export const trackColor = colors.border.subtle;
export const activeColor = colors.brand.primary;
export const disabledColor = colors.border.strong;
