"use client";

import Image from "next/image";
import { toggleTheme, useTheme } from "dodam-design-system/themes";
import { Moon, Sun } from "lucide-react";
import { Link } from "@cher1shrxd/loading";

const Header = () => {
  const theme = useTheme();

  return (
    <header className="w-full h-14 fixed top-0 bg-background-default z-50">
      <div className="w-full max-w-360 mx-auto h-full flex items-center gap-1 px-2">
        <Link href="/" className="h-full flex items-center gap-1">
          <Image
            src="/logo.svg"
            alt="dodam dodam logo"
            width={42}
            height={32}
          />
          <h1 className="text-brand-primary font-bold self-end mb-2">
            Design System
          </h1>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          className="ml-auto h-9 px-3 rounded-md border border-border-normal bg-background-surface cursor-pointer"
          aria-label="Toggle theme">
          {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
