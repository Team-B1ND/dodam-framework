import { CSSObject } from "@emotion/react";

export interface FileInputProps {
  label: string;
  supportingText?: string;
  isError?: boolean;
  isDisabled?: boolean;
  required?: boolean;
  accept?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  width?: number;
  customStyle?: CSSObject;
}
