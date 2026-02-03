"use client";

import { colors } from "@/colors";
import { shapes } from "@/shapes";
import { typoCss } from "@/typography";
import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: ${colors.background.surface};
  border-radius: ${shapes.extraLarge};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: default;
`;

export const PopupContainer = styled.div`
  background-color: ${colors.background.surface};
  border-radius: ${shapes.extraLarge};
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: default;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
`;

export const Title = styled.h2`
  ${typoCss("Heading2", "Bold")}
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MonthText = styled.div`
  ${typoCss("Body1", "Medium")}
`;

export const Arrows = styled.div`
  display: flex;
  gap: 8px;
`;

export const Arrow = styled.button`
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const WeekRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: ${colors.text.tertiary};
  margin-bottom: 4px;
`;

export const Week = styled.span`
  ${typoCss("Label", "Regular")}
  flex: 1;
`;

export const Grid = styled.div`
  width: 280px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const Day = styled.button<{ $selected?: boolean; $isPast?: boolean }>`
  ${typoCss("Headline", "Medium")}
  height: 38px;
  border-radius: ${shapes.small};
  border: none;
  cursor: ${({ $isPast }) => ($isPast ? "default" : "pointer")};
  background: ${({ $selected }) =>
    $selected ? colors.brand.primary : "transparent"};
  color: ${({ $selected }) =>
    $selected ? colors.static.white : colors.text.tertiary};
  opacity: ${({ $isPast }) => ($isPast ? 0.3 : 1)};

  &:hover:not(:disabled) {
    background: ${({ $selected }) =>
      $selected ? colors.brand.primary : colors.fill.secondary};
  }

  &:disabled {
    cursor: default;
  }
`;

