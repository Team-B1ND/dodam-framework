import styled from "@emotion/styled";
import { colors } from "@/colors";
import { typoCss } from "@/typography";
import { CSSObject } from "@emotion/react";
import { hexToRgba } from "../../utils/hex-to-rgba";

export const LabelWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  position: absolute;
  left: 0;
  top: 80%;
  transform: translateY(-90%);
  transition: all 0.2s ease;
  pointer-events: none;
`;

export const RequiredDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: ${colors.status.error};
  border-radius: 16px;
  flex-shrink: 0;
`;

export const Container = styled.div<{
  $isError: boolean;
  $customStyle?: CSSObject;
  $width?: number;
}>`
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: 47px;
  padding: 4px 0px;

  border: none !important;
  border-radius: 0px !important;
  position: relative;

  ${({ $customStyle }) => $customStyle};

  label {
    ${typoCss("Headline", "Medium")}
    color: ${colors.text.tertiary};
    transition: all 0.2s ease;
  }

  input:focus ~ .textfield-label-wrapper label {
    color: ${colors.brand.primary};
  }

  input:valid ~ .textfield-label-wrapper label {
    color: ${({ $isError }) => $isError && colors.status.error};
  }

  input:disabled ~ .textfield-label-wrapper label {
    color: ${hexToRgba(colors.text.tertiary, 0.65)};
  }

  input:is(:focus, :valid) ~ .textfield-label-wrapper {
    transform: translateY(-250%);
  }

  input:is(:focus, :valid) ~ .textfield-label-wrapper label {
    ${typoCss("Label", "Medium")}
  }
`;

export const Input = styled.input<{ $isError: boolean }>`
  width: 97%;
  height: 45px;

  color: ${colors.text.primary};
  ${typoCss("Headline", "Medium")}

  border: none;
  border-bottom: 1.5px solid
    ${({ $isError }) => ($isError ? colors.status.error : colors.border.normal)};
  background-color: transparent;
  outline: none;

  &:disabled {
    border-bottom: 1.5px solid ${hexToRgba(colors.border.normal, 0.65)};
    background-color: transparent;
  }

  &:focus {
    border-bottom: 1.5px solid
      ${({ $isError }) =>
        $isError ? colors.status.error : colors.brand.primary};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 500px transparent inset !important;
    -webkit-text-fill-color: ${colors.text.primary} !important;
    background-color: transparent !important;
    background-clip: text !important;
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 20%;
  right: 4%;
  cursor: pointer;

  display: flex;
  align-items: center;
`;

export const SupportingText = styled.span<{ $isError: boolean }>`
  ${typoCss("Label", "Medium")}
  color: ${({ $isError }) =>
    $isError ? colors.status.error : colors.text.tertiary};
`;
