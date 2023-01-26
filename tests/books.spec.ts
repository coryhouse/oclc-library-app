import test, { expect, Page } from "@playwright/test";

const book1Title = "The Design of Everyday Things";
const book2Title = "The Most Human Human";

async function checkForBooks(page: Page) {
  // Locator
  const book1 = page.getByText(book1Title);
  const book2 = page.getByText(book2Title);

  // Should display at first
  await expect(page.getByRole("progressbar")).toHaveCount(1);

  // Should hide after loading completes.
  await expect(page.getByRole("progressbar")).toHaveCount(0);

  await expect(book1).toHaveCount(1);
  await expect(book2).toHaveCount(1);
}

async function deleteBook(page: Page, bookTitle: string) {
  await page.getByRole("button", { name: "Delete " + bookTitle }).click();
  await expect(page.getByText(bookTitle)).toHaveCount(0);
  await expect(page.getByText("Book deleted.")).toHaveCount(1);
}

async function addBook(page: Page, bookTitle: string, bookSubject: string) {
  await page.getByRole("link", { name: "Add Book" }).click();

  // now the URL should be manage-book
  expect(page.url()).toBe("http://localhost:5173/manage-book");

  await expect(page.getByRole("heading", { name: "Add Book" })).toHaveCount(1);

  // Fill out the form
  await page.getByLabel("Title").fill(bookTitle);
  await page.getByLabel("Subject").fill(bookSubject);
  await page.getByRole("button", { name: "Save" }).click();

  // Should be redirected to the home page
  await expect(page).toHaveURL("http://localhost:5173/");
  await expect(page.getByText("New Book")).toHaveCount(1);
  await expect(page.getByText("New Subject")).toHaveCount(1);
}

test("should display books, support adding, and deleting", async ({ page }) => {
  await page.goto("http://localhost:5173");
  await checkForBooks(page);

  // Delete
  await deleteBook(page, book1Title);
  await deleteBook(page, book2Title);
  await expect(page.getByText("No books in the library.")).toHaveCount(1);

  addBook(page, book1Title, "Design");
  addBook(page, book2Title, "Computer Science");
});

test("should support navigating between pages via the navbar", async ({
  page,
}) => {
  await page.goto("http://localhost:5173");
  await page.getByRole("link", { name: "About" }).click();
  expect(page.url()).toBe("http://localhost:5173/about");
  await page.getByRole("link", { name: "Home" }).click();
  expect(page.url()).toBe("http://localhost:5173/");
});
