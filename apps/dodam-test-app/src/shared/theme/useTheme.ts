import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import type { ThemeContextValue } from "./ThemeContext";

export const useTheme = (): ThemeContextValue => {
  return useContext(ThemeContext);
};