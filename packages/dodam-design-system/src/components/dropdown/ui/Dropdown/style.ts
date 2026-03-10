import { colors } from "@/colors";
import { shapes } from "@/shapes";
import { typoCss } from "@/typography";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

export const Container = styled.div<{ $customStyle?: CSSObject }>`
  width: min-content;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  position: relative;
  gap: 12px;
  cursor: pointer;
  background-color: ${colors.fill.primary};
  border-radius: ${shapes.medium};

  > p {
    ${typoCss("Headline", "Medium")};
    white-space: nowrap;
    color: ${colors.text.primary};
    flex: 1;
  }

  ${({ $customStyle }) => $customStyle}
`;

export const OptionWrap = styled.div<{ $dropUp?: boolean }>`
  width: 100%;
  max-height: 200px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 4px;

  position: absolute;
  ${({ $dropUp }) =>
    $dropUp ? "bottom: calc(100% + 4px);" : "top: calc(100% + 4px);"}
  left: 0px;

  background-color: ${colors.fill.primary};
  border-radius: ${shapes.medium};
  box-sizing: border-box;
  padding: 4px;
  z-index: 1000;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.fill.secondary};
    border-radius: 2px;
  }
`;

export const Option = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 8px;
  ${typoCss("Headline", "Medium")};
  color: ${colors.text.secondary};
  cursor: pointer;
  border-radius: ${shapes.small};

  @media (hover: hover) {
    &:hover {
      background-color: ${colors.fill.secondary};
    }
  }
`;
