"use client";

import styled from "@emotion/styled";
import { ITEM_HEIGHT, VISIBLE_COUNT } from "../../constants";
import { typoCss } from "@/typography";
import { shapes } from "@/shapes";
import { colors } from "@/colors";

export const Container = styled.div`
  padding: 24px;
  border-radius: ${shapes.extraLarge};
  background-color: ${colors.background.surface};
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: default;
`;

export const PopupContainer = styled.div`
  padding: 24px;
  border-radius: ${shapes.extraLarge};
  background-color: ${colors.background.surface};
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: default;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
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
  ${({ active }) =>
    active ? typoCss("Title3", "Medium") : typoCss("Heading1", "Regular")};
  height: ${ITEM_HEIGHT}px;
  min-width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: center;
  color: ${({ active }) => (active ? colors.text.primary : colors.text.tertiary)};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  user-select: none;
  font-variant-numeric: tabular-nums;
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

