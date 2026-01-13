import { colors } from "@dds-web/colors";
import styled from "@emotion/styled";

export const Container = styled.div<{ $gap: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $gap }) => $gap}px;
`;

export const Dot = styled.div<{ $size: number; $color: string, $isActive: boolean }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ $color, $isActive }) => $isActive ? $color : colors.text.disabled};
  border-radius: 50%;
  cursor: pointer;
`;