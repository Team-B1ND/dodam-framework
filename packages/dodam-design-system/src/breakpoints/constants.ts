export const breakpoints = {
  mobile: 0,
  tablet: 640,
  desktop: 1024,
  largeDesktop: 1440,
} as const;

export const maxWidths = {
  mobile: 639,
  tablet: 1023,
  desktop: 1439,
  largeDesktop: Infinity,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

export const mediaQueries = {
  mobile: `(max-width: ${maxWidths.mobile}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px) and (max-width: ${maxWidths.tablet}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px) and (max-width: ${maxWidths.desktop}px)`,
  largeDesktop: `(min-width: ${breakpoints.largeDesktop}px)`,
  tabletUp: `(min-width: ${breakpoints.tablet}px)`,
  desktopUp: `(min-width: ${breakpoints.desktop}px)`,
  largeDesktopUp: `(min-width: ${breakpoints.largeDesktop}px)`,
  tabletDown: `(max-width: ${maxWidths.tablet}px)`,
  desktopDown: `(max-width: ${maxWidths.desktop}px)`,
  mobileOnly: `(max-width: ${maxWidths.mobile}px)`,
} as const;

export const mq = {
  mobile: `@media ${mediaQueries.mobile}`,
  tablet: `@media ${mediaQueries.tablet}`,
  desktop: `@media ${mediaQueries.desktop}`,
  largeDesktop: `@media ${mediaQueries.largeDesktop}`,
  tabletUp: `@media ${mediaQueries.tabletUp}`,
  desktopUp: `@media ${mediaQueries.desktopUp}`,
  largeDesktopUp: `@media ${mediaQueries.largeDesktopUp}`,
  tabletDown: `@media ${mediaQueries.tabletDown}`,
  desktopDown: `@media ${mediaQueries.desktopDown}`,
  mobileOnly: `@media ${mediaQueries.mobileOnly}`,
} as const;
