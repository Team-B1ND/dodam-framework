import { useContext, useEffect, useRef, useState } from "react";
import { Routes } from "../types";
import { RouteContext } from "../contexts/route-context";
import { RouteRenderer } from "./RouteRenderer";
import { StackScreen } from "./StackScreen";
import { useBridgeResponse } from "../../bridge-kit/app";
import { motion, useAnimationControls } from "framer-motion";

interface Props {
  routes: Routes;
}

export const Router = ({ routes }: Props) => {
  const { stack, tab } = useContext(RouteContext);
  const stackRef = useRef(stack);
  const containerControls = useAnimationControls();
  const [closeSignal, setCloseSignal] = useState(0);

  useEffect(() => {
    stackRef.current = stack;
  }, [stack]);

  useEffect(() => {
    containerControls.start({
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 26,
      },
    });
  }, [containerControls]);

  useBridgeResponse("NAVIGATION_POP", async () => {
    if (stackRef.current.length === 0) {
      await containerControls.start({
        scale: 0.8,
        transition: {
          type: "tween",
          ease: [0.36, 0.66, 0.04, 1],
          duration: 0.24,
        },
      });
    } else {
      setCloseSignal((prev) => prev + 1);
    }

    return { message: "navigation popped" };
  });

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={containerControls}
      style={{
        transformOrigin: "50% 50%",
      }}>
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
