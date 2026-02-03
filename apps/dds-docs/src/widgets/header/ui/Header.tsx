"use client";

import Image from "next/image";
import { toggleTheme, useTheme } from "dodam-design-system/themes";
import { Menu, Moon, Sun } from "lucide-react";
import { Link } from "@cher1shrxd/loading";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";

const ICON_BUTTON_STYLES =
  "h-9 w-9 flex items-center justify-center rounded-md border border-border-normal bg-background-surface cursor-pointer";

const Header = () => {
  const theme = useTheme();
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  return (
    <header className="fixed top-0 z-50 w-full h-14 bg-background-default">
      <div className="flex items-center gap-1 w-full max-w-360 h-full mx-auto px-2">
        <button
          type="button"
          onClick={toggleSidebar}
          className={`md:hidden ${ICON_BUTTON_STYLES}`}
          aria-label="Toggle menu">
          <Menu size={18} />
        </button>

        <Link href="/" className="flex items-center gap-1 h-full">
          <Image src="/logo.svg" alt="dodam dodam logo" width={42} height={32} />
          <h1 className="hidden sm:block self-end mb-2 text-brand-primary font-bold">
            Design System
          </h1>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          className={`ml-auto ${ICON_BUTTON_STYLES}`}
          aria-label="Toggle theme">
          {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
