import { colors } from "../../../../colors";
import { shapes } from "../../../../shapes";
import { typoCss } from "../../../../typography";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

export const Container = styled.div<{ $customStyle?: CSSObject }>`
  width: min-content;
  height: auto;

  display: flex;
  align-items: center;
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
  }

  ${({ $customStyle }) => $customStyle}
`;

export const Icon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.text.primary};

  > svg {
    width: 100%;
    height: 100%;
  }
`;

export const OptionWrap = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 4px;

  position: absolute;
  top: calc(100% + 4px);
  left: 0px;

  overflow: hidden;
  background-color: ${colors.fill.primary};
  border-radius: ${shapes.medium};
  box-sizing: border-box;
  padding: 4px;
  z-index: 1000;
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

  &:hover {
    background-color: ${colors.fill.secondary};
  }
`;
