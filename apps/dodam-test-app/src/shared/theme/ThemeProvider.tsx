import React, { useCallback, useEffect, useMemo, useState, PropsWithChildren } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "@shared/tokens";
import { ThemeContext } from "./ThemeContext";
import type { ThemeMode } from "./types";

interface ThemeProviderProps {
  initialMode?: ThemeMode;
}

export const ThemeProvider = ({
  initialMode,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    initialMode ?? (systemScheme === "dark" ? "dark" : "light"),
  );

  useEffect(() => {
    if (!initialMode && (systemScheme === "light" || systemScheme === "dark")) {
      setMode(systemScheme);
    }
  }, [initialMode, systemScheme]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      colors: mode === "light" ? lightColors : darkColors,
      toggleTheme,
      setTheme: setMode,
    }),
    [mode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};