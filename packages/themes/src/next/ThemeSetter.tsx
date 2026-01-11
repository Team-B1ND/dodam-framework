"use client";

import Script from "next/script";
import { initTheme } from "../init-theme";

export const ThemeSetter = () => {
  return (
    <Script strategy="beforeInteractive" id="dds-theme">
      {`(${initTheme.toString()})();`}
    </Script>
  );
};
