import styled from "@emotion/styled";
import { colors } from "@/colors";
import { shapes } from "@/shapes";
import { typoCss } from "@/typography";
import { CSSObject } from "@emotion/react";
import { hexToRgba } from "../../utils/hex-to-rgba";

export const Container = styled.div<{
  $customStyle?: CSSObject;
  $width?: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: 80px;
  position: relative;

  ${({ $customStyle }) => $customStyle};
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 4px;
`;

export const RequiredDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${colors.status.error};
  border-radius: 16px;
`

export const Label = styled.span<{
  $isFocused: boolean;
  $isDisabled?: boolean;
  $isError: boolean;
}>`
  color: ${({ $isFocused, $isDisabled, $isError }) =>
    $isDisabled
      ? hexToRgba(colors.text.disabled, 0.65)
      : $isError
        ? colors.status.error
        : $isFocused
          ? colors.brand.primary
          : colors.text.tertiary};

  ${typoCss("Label", "Medium")};
  font-feature-settings: "ss10" on;
`;

export const InputWrapper = styled.div<{
  $isFocused: boolean;
  $isDisabled?: boolean;
  $isError: boolean;
}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  width: 100%;
  height: 56px;
  padding: 4px 12px 4px 16px;

  border: 1px solid
    ${({ $isFocused, $isDisabled, $isError }) =>
      $isDisabled
        ? hexToRgba(colors.border.disabled, 0.65)
        : $isError
          ? colors.status.error
          : $isFocused
            ? colors.brand.primary
            : colors.border.normal};

  background-color: ${({ $isFocused, $isError }) =>
    $isError
      ? hexToRgba("#E52222", 0.03)
      : $isFocused
        ? hexToRgba("#008BFF", 0.03)
        : "transparent"};

  border-radius: ${shapes.medium};

  input {
    color: ${colors.text.primary};
    ${typoCss("Headline", "Medium")};
    background: transparent;
    width: 90%;
    height: 100%;
    border: none;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 500px transparent inset !important;
      -webkit-text-fill-color: ${colors.text.primary} !important;
      background-color: transparent !important;
      background-clip: text !important;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ $isDisabled }) =>
        $isDisabled
          ? hexToRgba(colors.text.disabled, 0.65)
          : colors.text.placeholder};
    }
  }
`;

export const IconWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SupportingText = styled.span<{
  $isDisabled?: boolean;
  $isError: boolean;
}>`
  color: ${({ $isDisabled, $isError }) =>
    $isDisabled
      ? hexToRgba(colors.text.disabled, 0.65)
      : $isError
        ? colors.status.error
        : colors.text.tertiary};
  ${typoCss("Label", "Medium")};
  font-feature-settings: "ss10" on;
`;
