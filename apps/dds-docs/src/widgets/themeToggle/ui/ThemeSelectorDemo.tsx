"use client";

import { applyTheme } from "dodam-design-system/themes";
import { Sun, Moon } from "lucide-react";

const ThemeSelectorDemo = () => {
  return (
    <div className="flex items-center gap-4 p-6 bg-background-surface border border-border-normal rounded-lg my-6">
      <div className="flex gap-3">
        <button
          className="px-4 py-2 bg-static-white text-static-black border border-border-normal rounded-lg flex items-center gap-2"
          onClick={() => applyTheme("light")}
        >
          <Sun size={16} color="#0F0F10" />
          Light
        </button>
        <button
          className="px-4 py-2 bg-static-black text-static-white border border-border-normal rounded-lg flex items-center gap-2"
          onClick={() => applyTheme("dark")}
        >
          <Moon size={16} color="#F5F5F5" />
          Dark
        </button>
      </div>
    </div>
  );
};

export default ThemeSelectorDemo;
