import { PropsWithChildren } from "react";
import { SafeAreaContext } from "../contexts/safe-area-context";

export const SafeAreaProvider = ({ children }: PropsWithChildren) => {
  const searchParam = new URLSearchParams(window.location.search);
  const top = Number(searchParam.get("top") || "0");
  const bottom = Number(searchParam.get("bottom") || "0");

  return (
    <SafeAreaContext.Provider value={{ top, bottom }}>
      {children}
    </SafeAreaContext.Provider>
  );
};
