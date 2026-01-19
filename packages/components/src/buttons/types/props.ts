import { CSSObject } from "@emotion/styled";
import { ComponentProps } from "react";
import { ButtonSizes, FilledButtonRoles } from "../types/buttonSize";

export interface FilledButtonProps extends ComponentProps<"button"> {
  role: FilledButtonRoles;
  size: ButtonSizes;
  onClick: () => void;
  buttonCustomStyle: CSSObject;
}

export interface TextButtonProps extends ComponentProps<"button"> {
  size: ButtonSizes;
  onClick: () => void;
  buttonCustomStyle: CSSObject;
}