import { CSSObject } from "@emotion/styled";

export interface ProgressProps {
  progress: number;
  disabled?: boolean;
  customStyle?: CSSObject;
}
