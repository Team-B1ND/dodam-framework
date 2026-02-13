"use client";

import { ParamsContext } from "./params-context";
import { StackContext } from "./stack-context";
import { StackProviderProps } from "./types";
import { useProvideStack } from "../hooks/useProvideStack";
import { StackScreen } from "./StackScreen";
import { useSwipe } from "../hooks/useSwipe";
import * as S from "../styles";
import { useState, useCallback, useEffect } from "react";

export const StackProvider = ({ children, safeArea }: StackProviderProps) => {
  const { ctxValue, element, params, stack, pop } = useProvideStack(children);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);

  const popStack = useCallback(() => {
    if (stack.length > 0) {
      setExitingIndex(stack.length - 1);
    }
  }, [stack.length]);

  const handleExitComplete = useCallback(() => {
    pop();
    setExitingIndex(null);
  }, [pop]);

  const { topScreenRef, handleDragStart } = useSwipe(popStack);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      if (stack.length > 1) {
        e.preventDefault?.();
        popStack();
        window.history.pushState(null, document.title, window.location.href);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [stack.length, popStack]);

  return (
    <StackContext.Provider value={{ ...ctxValue, back: popStack }}>
      <ParamsContext.Provider value={params}>
        <S.SafeArea $top={safeArea?.top ?? 0} $bottom={safeArea?.bottom ?? 0}>
          {element}
          {stack.map((item, idx) => (
            <StackScreen
              key={item.path}
              ref={idx === stack.length - 1 ? topScreenRef : null}
              item={item}
              index={idx}
              totalCount={stack.length}
              isExiting={exitingIndex === idx}
              onExitComplete={handleExitComplete}
              onDragStart={handleDragStart}
              safeArea={{
                top: safeArea?.top ?? 0,
                bottom: safeArea?.bottom ?? 0,
              }}
            />
          ))}
        </S.SafeArea>
      </ParamsContext.Provider>
    </StackContext.Provider>
  );
}
