import styled from "@emotion/styled";
import { ITEM_HEIGHT, VISIBLE_COUNT } from "../../constants";
import { typoCss } from "@dds-web/typography";
import { shapes } from "@dds-web/shapes";
import { colors } from "@dds-web/colors";

export const Container = styled.div`
  width: 160px;
  background-color: ${colors.background.surface};
  border: 1px solid ${colors.border.normal};
  border-radius: ${shapes.extraSmall};
  padding: 8px;
  color: ${colors.text.primary};
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const DateText = styled.span`
  ${typoCss("Label", "Regular")}
  flex: 1;
  user-select: none;
`;

export const Timer = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: -2px;
  padding: 24px;
  border-radius: ${shapes.extraLarge};
  background-color: ${colors.background.surface};
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: default;
`;

export const Title = styled.h2`
  ${typoCss("Heading2", "Bold")};
  user-select: none;
`;

export const Picker = styled.div`
  width: 280px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${ITEM_HEIGHT * VISIBLE_COUNT}px;
`;

export const Wheel = styled.div`
  padding: 0 20px;
  height: 100%;
  overflow-y: scroll;

  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  z-index: 2;
`;

export const Item = styled.div<{ active?: boolean }>`
  ${({ active }) => (active ? typoCss("Title3", "Medium") : typoCss("Heading1", "Regular"))};
  height: ${ITEM_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  color: ${({ active }) => (active ? colors.text.primary : colors.text.tertiary)};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  user-select: none;
`;

export const Colon = styled.div`
  ${typoCss("Heading1", "Bold")}
  color: ${colors.text.primary};
  margin: 0 8px;
  z-index: 2;
  user-select: none;
`;

export const Highlight = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  height: 44px;
  background-color: ${colors.fill.secondary};
  border-radius: ${shapes.small};
  pointer-events: none;
  z-index: 1;
`;

export const Button = styled.button`
  ${typoCss("Body1", "Bold")};
  padding: 12px 28px;
  width: 100%;
  border-radius: ${shapes.medium};
  border: none;
  background: ${colors.brand.primary};
  color: ${colors.static.white};
  cursor: pointer;
`;