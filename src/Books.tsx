import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import BookTable from "./BookTable";
import { getBooks } from "./services/books.service";

export type Book = {
  id: number;
  title: string;
  subject: string;
};

export type NewBook = Omit<Book, "id">;

export default function Books() {
  const bookQuery = useQuery(["books"], getBooks, {
    initialData: [],
  });

  function renderResults() {
    if (bookQuery.data.length === 0 && bookQuery.isFetching) {
      return (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      );
    }
    return <BookTable books={bookQuery.data} />;
  }

  return (
    <>
      <h1>Library App</h1>
      {bookQuery.isFetching && <p>Checking for new data...</p>}

      <a href="/manage-book">Add Book</a>

      {renderResults()}
    </>
  );
}
