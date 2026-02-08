import { ReactElement, ReactNode } from "react";

export interface StackProviderProps {
  children: ReactNode;
  safeArea?: {
    top?: number;
    bottom?: number;
  };
}

export interface RouteConfig {
  path: string;
  element: ReactElement;
}

export interface NavigationProps {
  path: string;
  element: ReactElement;
}