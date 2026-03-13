import { CSSObject } from "@emotion/react";

export interface DropdownItem {
  name: string;
  value: string;
}

export interface DropdownProps {
  items: DropdownItem[];
  value: string;
  onSelectedItemChange: (item: DropdownItem) => void;
  customStyle?: CSSObject;
}
