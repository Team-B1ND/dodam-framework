import { CSSObject } from "@emotion/react";
import { ChangeEventHandler, CSSProperties, KeyboardEventHandler } from "react";

export type InputType = "text" | "password";

export interface TextFieldProps {
  id: string;
  name: string;
  type: InputType;
  value: string;
  label: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isError?: boolean;
  showIcon?: boolean;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  width?: number;
  labelStyle?: CSSProperties;
  supportingText?: string;
  customStyle?: CSSObject;
  onRemoveClick?: () => void;
}
