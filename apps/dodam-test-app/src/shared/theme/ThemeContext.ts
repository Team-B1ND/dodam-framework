import { createContext } from "react";
import { ColorTokens, lightColors } from "@shared/tokens";
import type { ThemeMode } from "./types";

export interface ThemeContextValue {
  mode: ThemeMode;
  colors: ColorTokens;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  mode: "light",
  colors: lightColors,
  toggleTheme: () => {},
  setTheme: () => {},
});