import { STORAGE_KEY } from "../constants/key";
import { StateStore } from "../types";

export const loadFromStorage = (): StateStore => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};
