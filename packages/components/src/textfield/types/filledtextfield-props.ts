import { CSSObject } from "@emotion/react";
import { ComponentProps } from "react";

export type InputType = "text" | "password";

export interface FilledTextFieldProps extends ComponentProps<"input"> {
  type: InputType;
  label: string;
  isError?: boolean;
  width?: number;
  supportingText?: string;
  showIcon?: boolean;
  customStyle?: CSSObject;
  onRemoveClick?: () => void;
}
