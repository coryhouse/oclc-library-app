import test, { expect } from "@playwright/test";

test("should display a list of books", async ({ page }) => {
  await page.goto("http://localhost:5173/books");
  await expect(page.getByText("The Design of Everyday Things")).toHaveCount(1);
});
