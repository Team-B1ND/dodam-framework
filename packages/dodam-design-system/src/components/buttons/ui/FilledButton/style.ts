"use client";

import { colors } from "@/colors";
import { shapes } from "@/shapes";
import styled, { CSSObject } from "@emotion/styled";
import { ButtonSizes, FilledButtonRoles, ButtonDisplay } from "../../index";
import { typoCss } from "@/typography";

const sizeStyles = {
  large: { padding: "0 28px", height: "48px", radius: shapes.medium, typo: typoCss("Body1", "Medium") },
  mideum: { padding: "0 20px", height: "40px", radius: shapes.small, typo: typoCss("Body2", "Medium") },
  small: { padding: "0 12px", height: "32px", radius: shapes.extraSmall, typo: typoCss("Caption2", "Bold") },
};

const roleStyles = {
  primary: { bg: colors.brand.primary, color: colors.static.white },
  assistive: { bg: colors.fill.primary, color: colors.text.tertiary },
  negative: { bg: colors.status.error, color: colors.static.white },
};

export const Container = styled.button<{
  $size: ButtonSizes;
  $role: FilledButtonRoles;
  $display: ButtonDisplay;
  $disabled: string;
  $buttonCustomStyle: CSSObject;
}>`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.1s linear;

  padding: ${({ $size }) => sizeStyles[$size].padding};
  height: ${({ $size }) => sizeStyles[$size].height};
  min-height: ${({ $size }) => sizeStyles[$size].height};
  border-radius: ${({ $size }) => sizeStyles[$size].radius};
  ${({ $size }) => sizeStyles[$size].typo};

  background-color: ${({ $role }) => roleStyles[$role].bg};
  color: ${({ $role }) => roleStyles[$role].color};
  opacity: ${({ $disabled }) => ($disabled === "true" ? 0.5 : 1)};

  ${({ $display }) => $display === "fill" && "flex: 1; min-width: 0;"}

  ${({ $buttonCustomStyle }) => $buttonCustomStyle};
`;
