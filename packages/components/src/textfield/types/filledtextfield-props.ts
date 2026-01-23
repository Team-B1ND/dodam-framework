import { CSSObject } from "@emotion/react";
import { ChangeEventHandler, KeyboardEventHandler } from "react";

export type InputType = "text" | "password";

export interface FilledTextFieldProps {
  type: InputType;
  label: string;
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isError?: boolean;
  width?: number;
  name?: string;
  isDisabled?: boolean;
  supportingText?: string;
  showIcon?: boolean;
  customStyle?: CSSObject;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onRemoveClick?: () => void;
}
