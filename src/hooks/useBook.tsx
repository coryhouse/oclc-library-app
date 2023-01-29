import { useQuery } from "@tanstack/react-query";
import { Book, NewBook } from "../Books";

export default function useBook(
  bookId: number,
  setBook: React.Dispatch<React.SetStateAction<NewBook | Book>>
) {
  return useQuery(["book", bookId], () => getBook(bookId), {
    refetchOnWindowFocus: false,
    onSuccess: (book) => {
      setBook(book);
    },
  });
}

export async function getBook(bookId: number): Promise<Book> {
  const response = await fetch("http://localhost:3001/books/" + bookId);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}
