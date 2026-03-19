import { useContext } from "react";
import { Routes } from "../types";
import { RouteContext } from "../contexts/route-context";
import { RouteRenderer } from "./RouteRenderer";
import { StackScreen } from "./StackScreen";
import { useBridgeProvider, Actions } from "../../bridge-kit/web";
import { motion } from "framer-motion";
import { useRootPopAnimation } from "../hooks/useRootPopAnimation";

interface Props {
  routes: Routes;
}

export const Router = ({ routes }: Props) => {
  const { stack, tab } = useContext(RouteContext);
  const { send } = useBridgeProvider();
  const {
    containerScale,
    closeSignal,
    onRootPointerDown,
    onRootPointerMove,
    onRootPointerUp,
  } = useRootPopAnimation({
    stackLength: stack.length,
    sendPop: () => {
      send(Actions.NAVIGATION_POP);
    },
  });

  return (
    <motion.div
      style={{
        scale: containerScale,
        transformOrigin: "50% 50%",
      }}
      onPointerDown={onRootPointerDown}
      onPointerMove={onRootPointerMove}
      onPointerUp={onRootPointerUp}
      onPointerCancel={onRootPointerUp}>
      <RouteRenderer routes={routes.tabs} path={tab} />
      {stack.map((entry, i) => (
        <StackScreen
          key={`${entry.path}-${i}`}
          closeSignal={closeSignal}
          isTop={i === stack.length - 1}>
          <RouteRenderer
            routes={routes.stacks}
            path={entry.path}
            state={entry.state}
          />
        </StackScreen>
      ))}
    </motion.div>
  );
};
