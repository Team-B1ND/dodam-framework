import { CSSObject } from "@emotion/styled";
import { ComponentProps, Dispatch, SetStateAction } from "react";
import { ButtonSizes, FilledButtonRoles, ButtonDisplay } from "../types/buttonSize";

export interface FilledButtonProps extends ComponentProps<"button"> {
  role: FilledButtonRoles;
  size: ButtonSizes;
  display: ButtonDisplay;
  onClick: () => void;
  buttonCustomStyle: CSSObject;
}

export interface TextButtonProps extends ComponentProps<"button"> {
  size: ButtonSizes;
  onClick: () => void;
  buttonCustomStyle: CSSObject;
}

export interface SegmentedButtonData {
  text: string;
  isActive: boolean;
  value: string;
}

export interface SegmentedButtonProps {
  data: SegmentedButtonData[];
  setData: Dispatch<SetStateAction<SegmentedButtonData[]>>;
  onBlockClick?: (value: string) => void;
  width?: string;
  containerCustomStyle?: CSSObject;
  itemCustomStyle?: CSSObject;
}