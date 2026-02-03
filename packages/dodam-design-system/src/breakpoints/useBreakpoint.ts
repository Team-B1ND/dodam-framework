"use client";

import { useSyncExternalStore } from "react";
import { breakpoints, maxWidths, type BreakpointKey } from "./constants";

export interface BreakpointState {
  current: BreakpointKey;
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  isTabletUp: boolean;
  isDesktopUp: boolean;
  isLargeDesktopUp: boolean;
  isTabletDown: boolean;
  isDesktopDown: boolean;
}

function getWidth() {
  return window.innerWidth;
}

function getServerWidth() {
  return 0;
}

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getBreakpointState(width: number): BreakpointState {
  const current: BreakpointKey =
    width >= breakpoints.largeDesktop
      ? "largeDesktop"
      : width >= breakpoints.desktop
        ? "desktop"
        : width >= breakpoints.tablet
          ? "tablet"
          : "mobile";

  return {
    current,
    width,
    isMobile: current === "mobile",
    isTablet: current === "tablet",
    isDesktop: current === "desktop",
    isLargeDesktop: current === "largeDesktop",
    isTabletUp: width >= breakpoints.tablet,
    isDesktopUp: width >= breakpoints.desktop,
    isLargeDesktopUp: width >= breakpoints.largeDesktop,
    isTabletDown: width <= maxWidths.tablet,
    isDesktopDown: width <= maxWidths.desktop,
  };
}

export function useBreakpoint(): BreakpointState {
  const width = useSyncExternalStore(subscribe, getWidth, getServerWidth);
  return getBreakpointState(width);
}

export function matchesBreakpoint(
  width: number,
  breakpoint: BreakpointKey
): boolean {
  const min = breakpoints[breakpoint];
  const max = maxWidths[breakpoint];
  return max === Infinity ? width >= min : width >= min && width <= max;
}
