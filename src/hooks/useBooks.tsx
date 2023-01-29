import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../services/books.service";

export default function useBooks() {
  const bookQuery = useQuery(["books"], getBooks, {
    initialData: [],
  });

  return bookQuery;
}
