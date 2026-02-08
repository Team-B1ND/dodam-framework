import { create } from "zustand";
import { StackState } from "../core/types";

export const useStackStore = create<StackState>((set) => ({
  stack: [],
  push(stack) {
    set((state) => ({ stack: [...state.stack, stack] }));
  },
  pop() {
    set((state) => ({ stack: state.stack.slice(0, -1) }));
  },
}));