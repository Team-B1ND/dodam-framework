import { useContext } from "react";
import { Routes } from "../types";
import { RouteContext } from "../contexts/route-context";
import { RouteRenderer } from "./RouteRenderer";
import { StackScreen } from "./StackScreen";

interface Props {
  routes: Routes;
}

export const Router = ({ routes }: Props) => {
  const { stack, tab } = useContext(RouteContext);

  return (
    <div>
      <RouteRenderer routes={routes.tabs} path={tab} />
      {stack.map((entry, i) => (
        <StackScreen key={`${entry.path}-${i}`}>
          <RouteRenderer
            routes={routes.stacks}
            path={entry.path}
            state={entry.state}
          />
        </StackScreen>
      ))}
    </div>
  );
};
