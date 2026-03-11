import { JSX, ReactNode } from "react";

export interface RouteParams {
  [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RouteState = Record<string, any>;

export interface RouteProps<S extends RouteState = RouteState> {
  outlet?: ReactNode;
  params?: RouteParams;
  state?: S;
}

export interface RouteNode {
  path: string;
  index?: boolean;
  element: (props: RouteProps) => JSX.Element;
  children?: RouteNode[];
}

export interface Routes {
  stacks: RouteNode[];
  tabs: RouteNode[];
}

export interface StackEntry {
  path: string;
  state?: RouteState;
}

export interface ContextType {
  stack: StackEntry[];
  tab: string;
  move: (target: string, state?: RouteState) => void;
  push: (target: string, state?: RouteState) => void;
  pop: (target?: string) => void;
}

export interface MatchedRoute {
  node: RouteNode;
  parent?: RouteNode;
  params: RouteParams;
}