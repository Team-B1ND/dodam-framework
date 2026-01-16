"use client";

import { colors } from "@dds-web/colors";
import { shapes } from "@dds-web/shapes";
import styled, { CSSObject } from "@emotion/styled";
import { ButtonSizes, FilledButtonRoles } from "../../types/buttonSize";

export const Container = styled.button<{
  $size: ButtonSizes;
  $role: FilledButtonRoles;
  $disabled: string;
  $buttonCustomStyle: CSSObject;
}>`
  ${({ $buttonCustomStyle }) => $buttonCustomStyle};
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $size }) =>
    $size === "large" ? "0 28px" : $size === "mideum" ? "0 20px" : "0 12px"};
  border-radius: ${({ $size }) =>
    $size === "large" ? shapes.medium
    : $size === "mideum" ? shapes.small
    : $size === "small" ? shapes.extraSmall 
    : ""};
  background-color: ${({ $role }) =>
    $role === "primary" ? colors.brand.primary
    : $role === "assistive" ? colors.fill.primary
    : $role === "negative" ? colors.status.error
    : ""};
  color: ${({ $role }) =>
    $role === "primary" ? colors.static.white
    : $role === "assistive" ? colors.text.tertiary
    : $role === "negative" ? colors.static.white
    : ""};
  opacity: ${({ $disabled }) => ($disabled === "true" ? 0.5 : 1)};
  min-height: ${({ $size }) => 
    $size === "large" ? "48px" 
    : $size === "mideum" ? "40px" 
    : $size === "small" ? "32px" 
    : ""};
  height: ${({ $size }) => 
    $size === "large" ? "48px" 
    : $size === "mideum" ? "40px" 
    : $size === "small" ? "32px" 
    : ""};
  cursor: pointer;
`;
