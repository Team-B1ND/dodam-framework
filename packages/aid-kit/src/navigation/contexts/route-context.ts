import { createContext } from "react";
import { ContextType } from "../types";

export const RouteContext = createContext<ContextType>({
  stack: [],
  tab: "",
  move: () => {
    throw new Error("RouteProvider 밖에서 사용되고 있어요.");
  },
  pop: () => {
    throw new Error("RouteProvider 밖에서 사용되고 있어요.");
  },
  push: () => {
    throw new Error("RouteProvider 밖에서 사용되고 있어요.");
  },
});
