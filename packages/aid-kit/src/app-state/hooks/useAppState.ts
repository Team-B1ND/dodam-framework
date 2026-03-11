import { Dispatch, SetStateAction, useContext, useState } from "react";
import { AppStateContext } from "../contexts/app-state-context";
import { Widen } from "../types";

export const useAppState = <T>(initialValue: T, key: string) => {
  const context = useContext(AppStateContext);
  if (!context)
    throw new Error("useAppState must be used within AppStateProvider");

  const { register, update } = context;

  const [state, setState] = useState<Widen<T>>(
    () => register(key, initialValue) as Widen<T>,
  );

  const setAppState: Dispatch<SetStateAction<Widen<T>>> = (action) => {
    setState((prev) => {
      const next = action instanceof Function ? action(prev) : action;
      update(key, next);
      return next;
    });
  };

  return [state, setAppState] as [Widen<T>, Dispatch<SetStateAction<Widen<T>>>];
};
