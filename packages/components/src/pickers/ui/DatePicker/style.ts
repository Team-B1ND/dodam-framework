"use client";

import { colors } from "@dds-web/colors";
import { shapes } from "@dds-web/shapes";
import { typoCss } from "@dds-web/typography";
import styled from "@emotion/styled";

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

export const Calender = styled.div`
  background-color: ${colors.background.surface};
  border-radius: ${shapes.extraLarge};
  position: absolute;
  top: calc(100% + 8px);
  left: -2px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  cursor: default;
  z-index: 2;
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

export const Day = styled.button<{ $selected?: boolean, $isPast?: boolean }>`
  ${typoCss("Headline", "Medium")}
  height: 38px;
  border-radius: ${shapes.small};
  border: none;
  cursor: pointer;
  background: ${({ $selected }) => ($selected ? colors.brand.primary : 'transparent')};
  color: ${({ $selected }) => ($selected ? colors.static.white : colors.text.tertiary)};
  opacity: ${({ $isPast }) => ($isPast ? 0.5 : 1)};
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