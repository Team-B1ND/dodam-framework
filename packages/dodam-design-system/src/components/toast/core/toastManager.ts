import { ToastItem, ToastOptions } from "../types/props";

type Listener = (toasts: ToastItem[]) => void;

const DEFAULT_DURATION = 3000;
const DEFAULT_POSITION = "bottom";

let toasts: ToastItem[] = [];
const listeners = new Set<Listener>();

const notify = () => listeners.forEach((listener) => listener([...toasts]));
const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const show = (message: string, options: ToastOptions = {}): string => {
  const id = generateId();
  const toast: ToastItem = {
    id,
    message,
    position: options.position ?? DEFAULT_POSITION,
    duration: options.duration ?? DEFAULT_DURATION,
    icon: options.icon,
    type: options.type ?? "default",
  };
  toasts = [...toasts, toast];
  notify();
  return id;
};

const hide = (id: string) => {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
};

export const toastManager = {
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
  show,
  hide,
  getToasts: () => [...toasts],
};

export type ToastFunction = {
  (message: string, options?: ToastOptions): string;
  success: (message: string, options?: Omit<ToastOptions, "type">) => string;
  error: (message: string, options?: Omit<ToastOptions, "type">) => string;
  warning: (message: string, options?: Omit<ToastOptions, "type">) => string;
  hide: (id: string) => void;
};

export const toast: ToastFunction = Object.assign(
  (message: string, options?: ToastOptions) => show(message, options),
  {
    success: (message: string, options?: Omit<ToastOptions, "type">) => show(message, { ...options, type: "success" }),
    error: (message: string, options?: Omit<ToastOptions, "type">) => show(message, { ...options, type: "error" }),
    warning: (message: string, options?: Omit<ToastOptions, "type">) => show(message, { ...options, type: "warning" }),
    hide,
  }
);
