import { memo } from "react";
import { LogoProps } from "../../types/props";
import { AppLogo } from "./AppLogo";

export const Logo = memo(({ children }: LogoProps) => (
  <>{children ?? <AppLogo />}</>
));
