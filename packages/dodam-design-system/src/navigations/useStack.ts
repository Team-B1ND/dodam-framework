import { useContext } from "react";
import { StackContext } from "./stack-context";

export const useStack = () => {
  const ctx = useContext(StackContext);
  if (!ctx) throw new Error("useStack must be used inside StackProvider");
  return ctx;
};
