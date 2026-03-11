import { useCallback, useState } from "react";
import { RouteContext } from "../contexts/route-context";
import { Routes, StackEntry, RouteState } from "../types";
import { isValidPath } from "../utils/match-routes";

interface Props {
  routes: Routes;
  children?: React.ReactNode;
}

export const RouteProvider = ({ routes, children }: Props) => {
  const [stack, setStack] = useState<StackEntry[]>([]);

  const [tabEntry, setTabEntry] = useState<StackEntry>({
    path: routes.tabs.find((t) => t.index)?.path ?? routes.tabs[0].path,
  });

  const move = useCallback(
    (target: string, state?: RouteState) => {
      if (isValidPath(routes.tabs, target)) {
        setTabEntry({ path: target, state });
      } else {
        throw new Error(`해당 경로의 페이지를 찾을 수 없습니다: ${target}`);
      }
    },
    [routes],
  );

  const push = useCallback(
    (target: string, state?: RouteState) => {
      if (isValidPath(routes.stacks, target)) {
        setStack((prev) => [...prev, { path: target, state }]);
      } else {
        throw new Error(`해당 경로의 페이지를 찾을 수 없습니다: ${target}`);
      }
    },
    [routes],
  );

  const pop = useCallback(
    (target?: string) => {
      if (!target) {
        setStack((prev) => prev.slice(0, -1));
      } else if (isValidPath(routes.stacks, target)) {
        setStack((prev) => {
          const idx = [...prev].reverse().findIndex((s) => s.path === target);
          if (idx === -1) return prev;
          const removeAt = prev.length - 1 - idx;
          return prev.filter((_, i) => i !== removeAt);
        });
      } else {
        throw new Error(`해당 경로의 페이지를 찾을 수 없습니다: ${target}`);
      }
    },
    [routes],
  );

  return (
    <RouteContext.Provider
      value={{ stack, tab: tabEntry.path, move, push, pop }}>
      {children}
    </RouteContext.Provider>
  );
};
