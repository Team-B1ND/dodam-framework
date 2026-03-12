import { MatchedRoute, RouteNode, RouteParams } from "../types";

const matchSegments = (pattern: string, actual: string): RouteParams | null => {
  const patternParts = pattern.split("/").filter(Boolean);
  const actualParts = actual.split("/").filter(Boolean);

  if (patternParts.length !== actualParts.length) return null;

  const params: RouteParams = {};

  for (let i = 0; i < patternParts.length; i++) {
    const p = patternParts[i];
    const a = actualParts[i];

    if (p.startsWith(":")) {
      params[p.slice(1)] = a;
    } else if (p !== a) {
      return null;
    }
  }

  return params;
};

const findIndexChild = (children: RouteNode[]): RouteNode | null =>
  children.find((c) => c.index) ?? children[0] ?? null;

export const matchRoute = (
  routes: RouteNode[],
  targetPath: string,
): MatchedRoute | null => {
  for (const route of routes) {
    const params = matchSegments(route.path, targetPath);

    if (params !== null) {
      if (route.children?.length) {
        const indexChild = findIndexChild(route.children);
        if (indexChild) {
          return { node: indexChild, parent: route, params };
        }
      }
      return { node: route, params };
    }

    if (route.children) {
      const routeParts = route.path.split("/").filter(Boolean);
      const targetParts = targetPath.split("/").filter(Boolean);

      if (targetParts.length <= routeParts.length) continue;

      const parentActual =
        "/" + targetParts.slice(0, routeParts.length).join("/");
      const parentParams = matchSegments(route.path, parentActual);

      if (parentParams === null) continue;

      const childPath = "/" + targetParts.slice(routeParts.length).join("/");

      for (const child of route.children) {
        if (child.index) continue;

        const childParams = matchSegments(child.path, childPath);
        if (childParams !== null) {
          return {
            node: child,
            parent: route,
            params: { ...parentParams, ...childParams },
          };
        }
      }
    }
  }

  return null;
};

export const isValidPath = (routes: RouteNode[], targetPath: string): boolean =>
  matchRoute(routes, targetPath) !== null;
