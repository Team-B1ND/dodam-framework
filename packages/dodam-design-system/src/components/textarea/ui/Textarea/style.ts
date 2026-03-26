import { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "@/colors";
import { shapes } from "@/shapes";
import { typoCss } from "@/typography";

export const Container = styled.div<{
  $width?: number;
  $customStyle?: CSSObject;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};

  ${({ $customStyle }) => $customStyle};
`;

export const Textarea = styled.textarea<{
  $isError: boolean;
  $height?: string;
}>`
  width: 100%;
  height: ${({ $height }) => $height || "140px"};
  padding: 10px;
  box-sizing: border-box;

  ${typoCss("Body1", "Medium")};
  color: ${colors.text.primary};

  border: none;
  border-radius: ${shapes.medium};
  background-color: ${({ $isError }) =>
    $isError ? "rgba(229, 34, 34, 0.03)" : colors.fill.primary};

  resize: none;
  outline: none;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &::placeholder {
    color: ${colors.text.tertiary};
  }

  &:focus {
    background-color: ${({ $isError }) =>
      $isError ? "rgba(229, 34, 34, 0.03)" : colors.fill.primary};
    box-shadow: none;
  }

  &:disabled {
    color: ${colors.text.disabled};
    background-color: ${colors.fill.disabled};
    resize: none;
    cursor: not-allowed;
  }
`;

export const SupportingText = styled.span<{
  $isError: boolean;
  $isDisabled: boolean;
}>`
  ${typoCss("Label", "Medium")};
  color: ${({ $isError, $isDisabled }) =>
    $isDisabled
      ? colors.text.disabled
      : $isError
      ? colors.status.error
      : colors.text.tertiary};
`;
