"use client";

import { ParamsContext } from "./params-context";
import { StackContext } from "./stack-context";
import { StackProviderProps } from "./types";
import { useProvideStack } from "../hooks/useProvideStack";

export function StackProvider({ children, safeArea }: StackProviderProps) {
  const { ctxValue, element, params } = useProvideStack(children);

  return (
    <StackContext.Provider value={ctxValue}>
      <ParamsContext.Provider value={params}>
        <div
          style={{
            paddingTop: safeArea?.top ?? 0,
            paddingBottom: safeArea?.bottom ?? 0,
          }}>
          {element}
        </div>
      </ParamsContext.Provider>
    </StackContext.Provider>
  );
}
