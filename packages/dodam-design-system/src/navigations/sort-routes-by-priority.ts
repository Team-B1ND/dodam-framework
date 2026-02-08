import { scoreRoute } from "./route-score";
import { RouteConfig } from "./types";

export const sortRoutesByPriority = (routes: RouteConfig[]): RouteConfig[] => {
  return [...routes].sort((a, b) => scoreRoute(b.path) - scoreRoute(a.path));
};
