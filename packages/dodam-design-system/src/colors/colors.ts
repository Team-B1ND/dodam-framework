import { Colors } from "./types";

export const colors: Colors = {
  brand: {
    primary: "var(--dds-color-brand-primary)",
    secondary: "var(--dds-color-brand-secondary)",
  },
  text: {
    primary: "var(--dds-color-text-primary)",
    secondary: "var(--dds-color-text-secondary)",
    tertiary: "var(--dds-color-text-tertiary)",
    placeholder: "var(--dds-color-text-placeholder)",
    disabled: "var(--dds-color-text-disabled)",
    inverse: "var(--dds-color-text-inverse)",
  },
  background: {
    default: "var(--dds-color-background-default)",
    surface: "var(--dds-color-background-surface)",
  },
  border: {
    normal: "var(--dds-color-border-normal)",
    strong: "var(--dds-color-border-strong)",
    subtle: "var(--dds-color-border-subtle)",
    disabled: "var(--dds-color-border-disabled)",
  },
  fill: {
    primary: "var(--dds-color-fill-primary)",
    secondary: "var(--dds-color-fill-secondary)",
    hover: "var(--dds-color-fill-hover)",
    disabled: "var(--dds-color-fill-disabled)",
  },
  status: {
    success: "var(--dds-color-status-success)",
    error: "var(--dds-color-status-error)",
    warning: "var(--dds-color-status-warning)",
    info: "var(--dds-color-status-info)",
  },
  overlay: {
    dim: "var(--dds-color-overlay-dim)",
  },
  static: {
    white: "var(--dds-color-static-white)",
    black: "var(--dds-color-static-black)",
  },
};