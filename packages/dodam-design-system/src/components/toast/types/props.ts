import { ReactNode } from "react";

export type ToastPosition = "top" | "bottom";
export type ToastType = "default" | "success" | "error" | "warning";

export interface ToastOptions {
  position?: ToastPosition;
  duration?: number;
  icon?: ReactNode;
  type?: ToastType;
}

export interface ToastItem extends Required<Omit<ToastOptions, "icon">> {
  id: string;
  message: string;
  icon?: ReactNode;
}
