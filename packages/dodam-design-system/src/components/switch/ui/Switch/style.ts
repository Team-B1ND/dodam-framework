import { colors } from "@/colors";
import styled, { CSSObject } from "@emotion/styled";

export type SwitchSize = "medium" | "small";

const SIZES: Record<SwitchSize, { width: number; height: number; thumb: number; translate: number }> = {
  medium: { width: 52, height: 30, thumb: 22, translate: 22 },
  small: { width: 44, height: 26, thumb: 18, translate: 18 },
};

export const getTranslateDistance = (size: SwitchSize) => SIZES[size].translate;

export const Track = styled.button<{
  $checked: boolean;
  $disabled: boolean;
  $size: SwitchSize;
  $customStyle: CSSObject;
}>`
  all: unset;
  display: flex;
  align-items: center;
  width: ${({ $size }) => SIZES[$size].width}px;
  height: ${({ $size }) => SIZES[$size].height}px;
  padding: 4px;
  border-radius: 9999px;
  box-sizing: border-box;
  background-color: ${({ $checked }) => ($checked ? colors.brand.primary : colors.fill.secondary)};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: background-color 0.15s;
  ${({ $customStyle }) => $customStyle};
`;

export const Thumb = styled.div<{ $size: SwitchSize }>`
  width: ${({ $size }) => SIZES[$size].thumb}px;
  height: ${({ $size }) => SIZES[$size].thumb}px;
  border-radius: 9999px;
  background-color: ${colors.static.white};
`;
