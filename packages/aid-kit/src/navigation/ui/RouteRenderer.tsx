import { RouteNode, RouteState } from "../types";
import { matchRoute } from "../utils/match-routes";

interface Props {
  routes: RouteNode[];
  path: string;
  state?: RouteState;
}

export const RouteRenderer = ({ routes, path, state }: Props) => {
  const matched = matchRoute(routes, path);
  if (!matched) return null;

  const { node, parent, params } = matched;

  if (parent) {
    const outlet = <node.element params={params} state={state} />;
    return <parent.element outlet={outlet} params={params} state={state} />;
  }

  return <node.element params={params} state={state} />;
};
