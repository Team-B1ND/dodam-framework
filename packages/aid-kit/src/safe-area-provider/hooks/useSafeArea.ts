import { useContext } from "react";
import { SafeAreaContext } from "../contexts/safe-area-context";

export const useSafeArea = () => {
  return useContext(SafeAreaContext);
};
