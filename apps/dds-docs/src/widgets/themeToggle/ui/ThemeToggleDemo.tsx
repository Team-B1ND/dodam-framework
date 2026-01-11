"use client";

import { useTheme, toggleTheme } from "@dds-web/themes";
import { colors } from "@dds-web/colors";
import { Moon, Sun } from "lucide-react";

const ThemeToggleDemo = () => {
  const theme = useTheme();

  return (
    <div className="flex items-center gap-4 p-6 bg-background-surface border border-border-normal rounded-lg my-6">
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 px-4 py-2 bg-fill-primary hover:bg-fill-hover border border-border-normal rounded-lg transition-colors"
      >
        {theme === "light" ? (
          <>
            <Moon size={20} color={colors.text.primary} />
            <span className="text-text-primary">다크 모드로 전환</span>
          </>
        ) : (
          <>
            <Sun size={20} color={colors.text.primary} />
            <span className="text-text-primary">라이트 모드로 전환</span>
          </>
        )}
      </button>
      <span className="text-text-tertiary text-sm">
        현재 테마: <code className="px-1.5 py-0.5 bg-fill-secondary rounded text-text-secondary">{theme}</code>
      </span>
    </div>
  );
};

export default ThemeToggleDemo;
