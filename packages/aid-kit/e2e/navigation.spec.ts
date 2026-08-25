import { expect, test } from "@playwright/test";

test.describe("Navigation: 저장된 라우터 경로 복원", () => {
  test("존재하지 않는 tab 경로는 기본 경로로 복원된다", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "app_state",
        JSON.stringify({
          "router-provider::tab-entry": { path: "/does-not-exist" },
        }),
      );
    });

    await page.goto("/");

    await expect(page.getByTestId("navigation-home")).toBeVisible();
    await expect(page.getByTestId("navigation-settings")).toHaveCount(0);
  });

  test("존재하지 않는 stack 경로는 렌더링하지 않는다", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        "app_state",
        JSON.stringify({
          "router-provider::stack": [{ path: "/does-not-exist" }],
        }),
      );
    });

    await page.goto("/");

    await expect(page.getByTestId("navigation-home")).toBeVisible();
    await expect(page.getByTestId("navigation-detail")).toHaveCount(0);
  });
});
