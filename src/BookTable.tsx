import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Book } from "./App";

type BookTableProps = {
  books: Book[];
  setBooks: (books: Book[]) => void;
};

export default function BookTable(props: BookTableProps) {
  function renderBook(book: Book) {
    return (
      <TableRow key={book.id}>
        <TableCell>
          <Button
            onClick={() => {
              props.setBooks(props.books.filter((b) => b.id !== book.id));
            }}
          >
            Delete
          </Button>
        </TableCell>
        <TableCell>{book.title}</TableCell>
        <TableCell>{book.subject}</TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Subject</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{props.books.map(renderBook)}</TableBody>
    </Table>
  );
}
