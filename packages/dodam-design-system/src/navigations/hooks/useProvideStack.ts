import { ReactNode, useMemo, useState } from "react";
import { NavigationProps } from "../core/types";
import { Navigation } from "../core/Navigation";
import { pathFromStack } from "../utils/path-from-stack";
import { matchRoute } from "../utils/match-route";
import { sortRoutesByPriority } from "../utils/sort-routes-by-priority";
import { useStackStore } from "../stores/stack";

export const useProvideStack = (children: ReactNode) => {
  const stackStore = useStackStore();

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

  const rootRoute = routes.find(r => r.path === "/");
  if (!rootRoute) {
    throw new Error("Root route '/' is required for stack view.");
  }


  const [stack, setStack] = useState<string[]>(["/"]);

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
        const targetRoute = routes.find(r => matchRoute(r.path, path));
        if (!targetRoute) return;
        if (path !== "/") {
          stackStore.push(targetRoute);
        }
        setStack(prev => [...prev, path]);
      },
    }),
    [currentPath, routes, stackStore.stack],
  );

  const pop = () => {
    if (stackStore.stack.length > 0) {
      stackStore.pop();
      setStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    }
  };

  return {
    ctxValue,
    element: rootRoute.element,
    params: match.params,
    stack: stackStore.stack,
    pop,
  };
};
