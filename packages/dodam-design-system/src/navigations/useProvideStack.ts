import { ReactNode, useEffect, useMemo, useState } from "react";
import { NavigationProps, RouteConfig } from "./types";
import { Navigation } from "./Navigation";
import { stackFromPath } from "./stack-from-path";
import { pathFromStack } from "./path-from-stack";
import { matchRoute } from "./match-route";
import { sortRoutesByPriority } from "./sort-routes-by-priority";

export const useProvideStack = (children: ReactNode) => {
  const routes = useMemo<RouteConfig[]>(() => {
    const result: RouteConfig[] = [];

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
        result.push({ path: props.path, element: props.element });
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
        setStack((prev) => {
          history.pushState(null, "", path);
          return stackFromPath(path, routes);
        });
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
