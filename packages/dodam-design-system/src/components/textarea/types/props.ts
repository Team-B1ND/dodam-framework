import { CSSObject } from "@emotion/react";
import { ComponentProps } from "react";

export interface TextareaProps extends ComponentProps<"textarea"> {
  isError?: boolean;
  supportingText?: string;
  width?: number;
  customStyle?: CSSObject;
  height?: string;
}
