import { CSSObject } from "@emotion/react";
import { MouseEventHandler } from "react";

export type TagColor = "red" | "blue" | "default";

export interface TagProps {
  text: string;
  color?: TagColor;
  onClick?: MouseEventHandler<HTMLDivElement>;
  customStyle?: CSSObject;
}
