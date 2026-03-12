import { createContext } from "react";
import { BridgeContextValue } from "../types/web";

export const BridgeContext = createContext<BridgeContextValue | null>(null);
