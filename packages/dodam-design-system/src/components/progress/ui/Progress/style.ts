import { colors } from "@/colors";
import styled, { CSSObject } from "@emotion/styled";

export const Container = styled.div<{ $customStyle: CSSObject }>`
  width: 100%;
  height: 14px;
  background-color: ${colors.border.subtle};
  border-radius: 999px;
  overflow: hidden;
  ${({ $customStyle }) => $customStyle};
`;

export const Bar = styled.div<{ $disabled: boolean }>`
  height: 100%;
  background-color: ${({ $disabled }) => ($disabled ? colors.border.strong : colors.brand.primary)};
  border-radius: 999px;
`;
