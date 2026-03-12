import { useContext } from "react";
import { RouteContext } from "../contexts/route-context";

export const useRouter = () => {
  const ctx = useContext(RouteContext);

  return {
    tab: {
      current: ctx.tab,
      move: ctx.move,
    },
    stack: {
      current: ctx.stack,
      push: ctx.push,
      pop: ctx.pop,
    },
  };
};
