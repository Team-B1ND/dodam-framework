import { useContext } from "react";
import { SafeAreaContext } from "../contexts/safearea-context";

export const useSafeArea = () => {
  return useContext(SafeAreaContext);
};
