import { CSSObject } from "@emotion/styled";
import { ReactNode } from "react";

export interface TabProps {
  children: ReactNode;
  itemGap?: number;
  fluid?: boolean;
  onChange?: (index: number) => void;
  customStyle?: CSSObject;
}

export interface TabItemProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}
