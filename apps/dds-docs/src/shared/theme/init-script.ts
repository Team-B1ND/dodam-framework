import { THEME_STORAGE_KEY } from "./constants";

export const themeInitScript = `(() => {
  try {
    const key = '${THEME_STORAGE_KEY}';
    const stored = localStorage.getItem(key);
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored === 'dark' || stored === 'light' ? stored : system;
    document.documentElement.dataset.theme = theme;
  } catch {
    // no-op
  }
})();`;
