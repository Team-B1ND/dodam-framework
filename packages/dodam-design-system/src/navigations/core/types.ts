import { ReactElement, ReactNode } from "react";

export interface StackProviderProps {
  children: ReactNode;
  safeArea?: {
    top?: number;
    bottom?: number;
  };
}

export interface NavigationProps {
  path: string;
  element: ReactElement;
  canGoBack?: boolean;
  header?: ReactNode;
}

export interface StackState {
  stack: NavigationProps[];
  push: (stack: NavigationProps) => void;
  pop: () => void;
}