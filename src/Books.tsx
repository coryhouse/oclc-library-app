import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import BookTable from "./BookTable";
import { getBooks } from "./services/books.service";

export type Book = {
  id: number;
  title: string;
  subject: string;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBooks() {
      const books = await getBooks();
      setIsLoading(false);
      setBooks(books);
    }
    loadBooks();
  }, []);

  function renderResults() {
    if (isLoading) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }
    if (books.length === 0) return <p>No books in the library.</p>;
    return <BookTable books={books} setBooks={setBooks} />;
  }

  return (
    <>
      <h1>Library App</h1>

      <a href="/manage-book">Add Book</a>

      {renderResults()}
    </>
  );
}
