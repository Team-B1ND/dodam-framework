import styled from "@emotion/styled";
import { colors } from "@/colors";
import { shapes } from "@/shapes";
import { typoCss } from "@/typography";
import { CSSObject } from "@emotion/react";
import { hexToRgba } from "../../utils/hex-to-rgba";

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

export const Label = styled.span<{
  $isError: boolean;
  $isDisabled?: boolean;
}>`
  ${typoCss("Label", "Medium")};
  color: ${({ $isError, $isDisabled }) =>
    $isDisabled
      ? hexToRgba(colors.text.disabled, 0.65)
      : $isError
      ? colors.status.error
      : colors.text.secondary};
`;

export const InputWrapper = styled.div<{
  $isError: boolean;
  $isDisabled?: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  gap: 8px;

  width: 100%;
  height: 56px;
  padding: 4px 12px 4px 16px;
  box-sizing: border-box;

  border: 1px solid
    ${({ $isError, $isDisabled }) =>
      $isDisabled
        ? hexToRgba(colors.border.disabled, 0.65)
        : $isError
        ? colors.status.error
        : colors.border.normal};

  border-radius: ${shapes.medium};

  background-color: ${({ $isError }) =>
    $isError ? hexToRgba("#E52222", 0.03) : colors.fill.primary};

  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.65 : 1)};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};

  transition: border-color 0.15s;

  @media (hover: hover) {
    &:hover {
      border-color: ${({ $isError, $isDisabled }) =>
        $isDisabled
          ? hexToRgba(colors.border.disabled, 0.65)
          : $isError
          ? colors.status.error
          : colors.brand.primary};
    }
  }
`;

export const FileName = styled.span<{ $hasFile: boolean }>`
  ${typoCss("Headline", "Medium")};
  color: ${({ $hasFile }) =>
    $hasFile ? colors.text.primary : colors.text.tertiary};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UploadButton = styled.div`
  ${typoCss("Label", "Medium")};
  color: ${colors.brand.primary};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
`;

export const SupportingText = styled.span<{
  $isError: boolean;
  $isDisabled?: boolean;
}>`
  ${typoCss("Label", "Medium")};
  color: ${({ $isError, $isDisabled }) =>
    $isDisabled
      ? hexToRgba(colors.text.disabled, 0.65)
      : $isError
      ? colors.status.error
      : colors.text.tertiary};
`;
