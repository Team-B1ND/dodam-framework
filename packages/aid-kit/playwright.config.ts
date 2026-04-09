import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:5174",
    browserName: "chromium",
  },
  webServer: {
    command: "npx vite --config e2e/app/vite.config.ts --port 5174",
    port: 5174,
    reuseExistingServer: !process.env.CI,
  },
});
