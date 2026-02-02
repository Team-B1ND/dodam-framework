import { typoCss } from "../../../../typography";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";
import { TagColor } from "../../types/props";
import { getBackgroundColor, getTextColor } from "../../utils/get-tag-colors";

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
