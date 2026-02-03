import { colors } from "@/colors";
import { shapes } from "@/shapes";
import { typoCss } from "@/typography";
import styled, { CSSObject } from "@emotion/styled";

export const Container = styled.div<{
  $width: string;
  $containerCustomStyle: CSSObject;
}>`
  width: ${({ $width }) => $width};
  display: flex;
  height: 48px;
  min-height: 48px;
  padding: 4px;
  border-radius: ${shapes.medium};
  background-color: ${colors.fill.secondary};
  position: relative;
  overflow: hidden;
  ${({ $containerCustomStyle }) => $containerCustomStyle};
`;

export const Indicator = styled.div`
  position: absolute;
  top: 4px;
  bottom: 4px;
  background-color: ${colors.fill.primary};
  border-radius: ${shapes.small};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Item = styled.button<{
  $isActive: string;
  $itemCustomStyle: CSSObject;
}>`
  all: unset;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: ${shapes.small};
  z-index: 1;
  color: ${({ $isActive }) =>
    $isActive === "true" ? colors.text.primary : colors.text.secondary};
  ${typoCss("Headline", "Medium")};
  cursor: pointer;
  transition: color 0.2s ease;
  ${({ $itemCustomStyle }) => $itemCustomStyle};
`;