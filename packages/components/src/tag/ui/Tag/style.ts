import { colors } from "@dds-web/colors";
import { typoCss } from "@dds-web/typography";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";
import { TagColor } from "../../types/props";

const getBackgroundColor = (color: TagColor) => {
  switch (color) {
    case "red":
      return colors.status.error;
    case "blue":
      return colors.brand.primary;
    case "default":
      return colors.fill.secondary;
  }
};

const getTextColor = (color: TagColor) => {
  switch (color) {
    case "red":
    case "blue":
      return colors.static.white;
    case "default":
      return colors.text.primary;
  }
};

export const Container = styled.div<{
  $color: TagColor;
  $customStyle?: CSSObject;
}>`
  width: auto;
  min-width: 45px;
  height: auto;
  min-height: 30px;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  border-radius: 34px;
  background-color: ${({ $color }) => getBackgroundColor($color)};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};

  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${({ onClick }) => (onClick ? 0.8 : 1)};
  }

  ${({ $customStyle }) => $customStyle}
`;

export const Text = styled.span<{ $color: TagColor }>`
  ${typoCss("Caption1", "Bold")};
  color: ${({ $color }) => getTextColor($color)};
  padding: 7.5px 12px;
`;
