import { CSSObject } from "@emotion/react";

export interface DropdownProps {
  items: string[];
  value: string;
  onSelectedItemChange: (item: string) => void;
  customStyle?: CSSObject;
}
