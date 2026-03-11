import { useEffect } from "react";
import { useBridgeProvider } from "./useBridgeProvider";
import { Action } from "../../shared/types/enums/actions";
import { Callback } from "../types/web";

export const useBridgeResponse = (type: Action, handler: Callback) => {
  const { subscribe } = useBridgeProvider();

  useEffect(() => {
    const unsubscribe = subscribe(type, handler);
    return unsubscribe;
  }, []);
};
