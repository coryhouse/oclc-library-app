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

type BookTableProps = {
  books: Book[];
  setBooks: (books: Book[]) => void;
};

export default function BookTable({ books, setBooks }: BookTableProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  function renderBook(book: Book) {
    return (
      <TableRow key={book.id}>
        <TableCell>
          <IconButton
            aria-label={"Delete " + book.title}
            onClick={async () => {
              await deleteBook(book.id);
              setBooks(books.filter((b) => b.id !== book.id));
              setShowDeleteConfirmation(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
        <TableCell>{book.title}</TableCell>
        <TableCell>{book.subject}</TableCell>
      </TableRow>
    );
  }

  function handleClose() {
    setShowDeleteConfirmation(false);
  }

  return (
    <>
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
