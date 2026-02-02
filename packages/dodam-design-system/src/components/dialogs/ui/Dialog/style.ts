import { colors } from "../../../../colors";
import { shapes } from "../../../../shapes";
import { typoCss } from "../../../../typography";
import styled from "@emotion/styled";

export const Modal = styled.div`
  width: 320px;
  background: ${colors.background.surface};
  border-radius: ${shapes.extraLarge};
  padding: 18px;
  max-height: 90vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 6px;
`;

export const Title = styled.h2`
  margin: 0;
  ${typoCss("Heading1", "Bold")};
  color: ${colors.text.primary};
`;

export const Description = styled.p`
  margin: 0;
  ${typoCss("Body1", "Medium")};
  color: ${colors.text.tertiary};
  white-space: pre-wrap;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
`;
