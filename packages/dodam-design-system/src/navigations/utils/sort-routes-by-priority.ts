import { NavigationProps } from "../core/types";
import { scoreRoute } from "./route-score";

export const sortRoutesByPriority = (routes: NavigationProps[]) => {
  return [...routes].sort((a, b) => scoreRoute(b.path) - scoreRoute(a.path)) as NavigationProps[];
};
