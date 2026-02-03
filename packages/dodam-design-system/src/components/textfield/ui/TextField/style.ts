import styled from "@emotion/styled";
import { colors } from "@/colors";
import { typoCss } from "@/typography";
import { CSSObject } from "@emotion/react";
import { hexToRgba } from "../../utils/hex-to-rgba";

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
    position: absolute;
    left: 0;
    top: 80%;

    ${typoCss("Headline", "Medium")}
    color: ${colors.text.tertiary};

    transform: translateY(-90%);
    transition: all 0.2s ease;
    pointer-events: none;
  }

  input:focus ~ label {
    color: ${colors.brand.primary};
  }

  input:valid ~ label {
    color: ${({ $isError }) => $isError && colors.status.error};
  }

  input:disabled ~ label {
    color: ${hexToRgba(colors.text.tertiary, 0.65)};
  }

  input:is(:focus, :valid) ~ label {
    ${typoCss("Label", "Medium")}
    transform: translateY(-250%);
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
