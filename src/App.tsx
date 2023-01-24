import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";

type Book = {
  id: number;
  title: string;
  subject: string;
};

export default function App() {
  const books: Book[] = [
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

  function renderBook(book: Book) {
    return (
      <TableRow key={book.id}>
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
            <TableCell>Title</TableCell>
            <TableCell>Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{books.map(renderBook)}</TableBody>
      </Table>
    </>
  );
}
