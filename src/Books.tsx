import { Box, CircularProgress } from "@mui/material";
import BookTable from "./BookTable";
import useBooks from "./hooks/useBooks";

export type Book = {
  id: number;
  title: string;
  subject: string;
};

export type NewBook = Omit<Book, "id">;

export default function Books() {
  const bookQuery = useBooks();

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
