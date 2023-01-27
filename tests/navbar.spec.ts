import test, { expect } from "@playwright/test";

test("navbar should render anchors when passed links", async ({ page }) => {
  await page.goto(
    "http://localhost:6006/iframe.html?args=links[0].label:f&id=reusable-navbar--primary&viewMode=story"
  );
  await expect(page.getByRole("link", { name: "Home" })).toHaveCount(1);
});
