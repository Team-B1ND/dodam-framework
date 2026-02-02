import { colors } from "../../../../colors";
import { shapes } from "../../../../shapes";
import { typoCss } from "../../../../typography";
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
  ${({ $containerCustomStyle }) => $containerCustomStyle};
`

export const Item = styled.button<{
  $isActive: string;
  $itemCustomStyle: CSSObject;
}>`
  all: unset;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  border-radius: ${shapes.small};
  color: ${({ $isActive }) => 
    $isActive === "true" ? colors.text.primary 
    : $isActive === "false" ? colors.text.secondary
    : ""};
  background-color: ${({ $isActive }) =>
    $isActive === "true" ? colors.fill.primary
    : $isActive === "false" ? "transparent" 
    : ""};
  ${typoCss("Headline", "Medium")};
  cursor: pointer;
  transition: all 0.1s linear;
  ${({ $itemCustomStyle }) => $itemCustomStyle}
`;