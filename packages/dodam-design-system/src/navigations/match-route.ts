import { splitPath } from "./segments";

export interface MatchResult {
  params: Record<string, string>;
}

export const matchRoute = (
  routePath: string,
  actualPath: string,
): MatchResult | null => {
  if (routePath === "/" && actualPath === "/") {
    return { params: {} };
  }

  const routeSegs = splitPath(routePath);
  const pathSegs = splitPath(actualPath);

  if (routeSegs.length !== pathSegs.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routeSegs.length; i++) {
    const r = routeSegs[i];
    const p = pathSegs[i];

    if (r.startsWith(":")) {
      params[r.slice(1)] = decodeURIComponent(p);
      continue;
    }

    if (r !== p) return null;
  }

  return { params };
}
