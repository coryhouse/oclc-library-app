import { useState } from "react";
import BookTable from "./BookTable";

export type Book = {
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

export default function Books() {
  const [books, setBooks] = useState(defaultBooks);

  function renderResults() {
    if (books.length === 0) return <p>No books in the library.</p>;
    return <BookTable books={books} setBooks={setBooks} />;
  }

  return (
    <>
      <h1>Library App</h1>
      {renderResults()}
    </>
  );
}
