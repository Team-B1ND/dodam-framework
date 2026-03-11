import { ReactNode, useRef } from "react";
import { AppStateContext } from "../contexts/app-state-context";
import { StateStore } from "../types";
import { loadFromStorage } from "../utils/load-from-storage";
import { STORAGE_KEY } from "../constants/key";

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<StateStore>(loadFromStorage());
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleFlush = () => {
    if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
    flushTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storeRef.current));
      } catch {}
    }, 100);
  };

  const register = (key: string, initialValue: unknown): unknown => {
    if (!(key in storeRef.current)) {
      storeRef.current[key] = initialValue;
    }
    return storeRef.current[key];
  };

  const update = (key: string, value: unknown) => {
    storeRef.current[key] = value;
    scheduleFlush();
  };

  return (
    <AppStateContext.Provider value={{ register, update }}>
      {children}
    </AppStateContext.Provider>
  );
};
