import { CSSObject } from "@emotion/styled";

export interface DotProps {
  size: number;
  backgroundColor: string;
  dotCustomStyle: CSSObject;
}

export interface BadgeProps {
  backgroundColor?: string;
  badgeCustomStyle?: CSSObject;
  number: number;
  maxNumber?: number;
}