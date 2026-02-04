import { CSSObject } from "@emotion/styled";

export interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  size?: "medium" | "small";
  customStyle?: CSSObject;
}
