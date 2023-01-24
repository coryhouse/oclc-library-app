import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

type Book = {
  id: number;
  title: string;
  subject: string;
};

let defaultBooks: Book[] = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    subject: "Design",
  },
  {
    id: 2,
    title: "The Most Human Human",
    subject: "Computer Science",
  },
];

export default function App() {
  const [books, setBooks] = useState(defaultBooks);

  function renderBook(book: Book) {
    return (
      <TableRow key={book.id}>
        <TableCell>
          <Button
            onClick={() => {
              setBooks(books.filter((b) => b.id !== book.id));
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
    <>
      <h1>Library App</h1>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{books.map(renderBook)}</TableBody>
      </Table>
    </>
  );
}
