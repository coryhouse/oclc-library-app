import test, { expect } from "@playwright/test";

test("should display a list of books and support deleting all books", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/books");
  await expect(page.getByText("The Design of Everyday Things")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Delete The Design of Everyday Things" })
    .click();
  await expect(page.getByText("The Design of Everyday Things")).toHaveCount(0);
});
