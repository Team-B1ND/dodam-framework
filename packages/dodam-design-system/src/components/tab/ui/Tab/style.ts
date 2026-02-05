import { colors } from "@/colors";
import { typoCss } from "@/typography";
import { HIDE_SCROLLBAR } from "@/styles";
import styled, { CSSObject } from "@emotion/styled";

export const Container = styled.div<{
  $fluid: boolean;
  $itemGap?: number;
  $customStyle: CSSObject;
}>`
  position: relative;
  display: flex;
  width: 100%;
  gap: ${({ $itemGap }) => ($itemGap ? `${$itemGap}px` : 0)};
  overflow-x: ${({ $fluid }) => ($fluid ? "auto" : "visible")};
  ${({ $fluid }) => $fluid && HIDE_SCROLLBAR};
  ${({ $customStyle }) => $customStyle};
`;

export const Item = styled.button<{
  $selected: boolean;
  $flex: boolean;
}>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: ${({ $flex }) => ($flex ? 1 : "none")};
  padding: 12px 0;
  white-space: nowrap;
  cursor: pointer;
  ${typoCss("Body1", "Medium")};
  color: ${({ $selected }) => ($selected ? colors.text.primary : colors.text.tertiary)};
  transition: color 0.15s;

  @media (hover: hover) {
    &:hover {
      color: ${colors.text.primary};
    }
  }
`;

export const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: ${colors.text.primary};
`;
