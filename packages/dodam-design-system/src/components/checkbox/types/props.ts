import { CSSObject } from "@emotion/styled";
import { CheckboxType } from "../types/checkboxType";

export interface CheckboxProps {
  size?: "medium" | "small";
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  type?: CheckboxType;
  checkboxCustomStyle?: CSSObject;
}