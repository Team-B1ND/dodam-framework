import { CSSObject } from "@emotion/react";
import { ComponentProps, CSSProperties } from "react";

export type InputType = "text" | "password";

export interface TextFieldProps extends ComponentProps<"input"> {
  type: InputType;
  label: string;
  isError?: boolean;
  showIcon?: boolean;
  isDisabled?: boolean;
  width?: number;
  labelStyle?: CSSProperties;
  supportingText?: string;
  customStyle?: CSSObject;
  onRemoveClick?: () => void;
}
