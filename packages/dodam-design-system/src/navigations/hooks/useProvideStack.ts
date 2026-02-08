import { ReactNode, useEffect, useMemo, useState } from "react";
import { NavigationProps } from "../core/types";
import { Navigation } from "../core/Navigation";
import { stackFromPath } from "../utils/stack-from-path";
import { pathFromStack } from "../utils/path-from-stack";
import { matchRoute } from "../utils/match-route";
import { sortRoutesByPriority } from "../utils/sort-routes-by-priority";

export const useProvideStack = (children: ReactNode) => {
  const routes = useMemo<NavigationProps[]>(() => {
    const result: NavigationProps[] = [];

    const walk = (nodes: ReactNode) => {
      if (!nodes) return;

      if (Array.isArray(nodes)) {
        nodes.forEach(walk);
        return;
      }

      if (
        typeof nodes === "object" &&
        "type" in nodes &&
        nodes.type === Navigation
      ) {
        const props = nodes.props as NavigationProps;
        result.push(props);
      }
    };

    walk(children);
    return result;
  }, [children]);

  const getInitialPath = () =>
    typeof window !== "undefined" ? window.location.pathname : "/";

  const [stack, setStack] = useState<string[]>(() =>
    stackFromPath(getInitialPath(), routes),
  );

  useEffect(() => {
    const onPopState = () => {
      setStack(stackFromPath(getInitialPath(), routes));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [routes]);

  const currentPath = pathFromStack(stack);

  const sortedRoutes = useMemo(() => sortRoutesByPriority(routes), [routes]);

  const match = useMemo(() => {
    for (const r of sortedRoutes) {
      const result = matchRoute(r.path, currentPath);
      if (result) {
        return { route: r, params: result.params };
      }
    }
    return null;
  }, [sortedRoutes, currentPath]);

  if (!match) {
    throw new Error(`No route matched: ${currentPath}`);
  }


  const ctxValue = useMemo(
    () => ({
      path: currentPath,

      push(path: string) {
        history.pushState(null, "", path);
        window.dispatchEvent(new PopStateEvent("popstate"));
      },

      back() {
        history.back();
      },
    }),
    [currentPath, routes],
  );

  return {
    ctxValue,
    element: match.route.element,
    params: match.params,
  };
};
