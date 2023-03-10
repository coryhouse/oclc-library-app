import {
  Alert,
  IconButton,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Book } from "./Books";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { deleteBook } from "./services/books.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type BookTableProps = {
  books: Book[];
};

export default function BookTable({ books }: BookTableProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bookId: number) => deleteBook(bookId),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  function renderBook(book: Book) {
    return (
      <TableRow key={book.id}>
        <TableCell>
          <IconButton
            aria-label={"Delete " + book.title}
            onClick={async () => {
              mutation.mutate(book.id, {
                onSuccess: () => {
                  setShowDeleteConfirmation(true);
                },
              });
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>
          <Link to={"/manage-book/" + book.id}>{book.title}</Link>
        </TableCell>
        <TableCell>{book.subject}</TableCell>
      </TableRow>
    );
  }

  function handleClose() {
    setShowDeleteConfirmation(false);
  }

  return (
    <>
      {books.length === 0 ? (
        <p>No books in the library.</p>
      ) : (
        <Table>
          <caption>List of Books</caption>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Subject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{books.map(renderBook)}</TableBody>
        </Table>
      )}

      <Snackbar
        open={showDeleteConfirmation}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Book deleted.
        </Alert>
      </Snackbar>
    </>
  );
}
