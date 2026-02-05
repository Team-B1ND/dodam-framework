import { ReactNode } from "react";
import { CSSObject } from "@emotion/styled";

export interface TopNavBarProps {
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  customStyle?: CSSObject;
}

export interface BackButtonProps {
  onClick?: () => void;
}

export interface TitleProps {
  children: string;
  hasBackButton?: boolean;
}

export interface LogoProps {
  children?: ReactNode;
}
