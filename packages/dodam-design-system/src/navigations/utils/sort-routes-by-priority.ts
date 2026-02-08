import { scoreRoute } from "./route-score";
import { RouteConfig } from "../core/types";

export const sortRoutesByPriority = (routes: RouteConfig[]): RouteConfig[] => {
  return [...routes].sort((a, b) => scoreRoute(b.path) - scoreRoute(a.path));
};
