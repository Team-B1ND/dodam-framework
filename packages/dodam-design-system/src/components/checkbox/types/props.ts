import { CSSObject } from "@emotion/styled";
import { CheckboxType } from "../types/checkboxType";

export type CheckboxVariant = "outlined" | "filled";

export interface CheckboxProps {
  size?: "medium" | "small";
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  type?: CheckboxType;
  variant?: CheckboxVariant;
  checkboxCustomStyle?: CSSObject;
}