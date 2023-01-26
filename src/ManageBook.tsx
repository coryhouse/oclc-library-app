import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { NewBook } from "./Books";
import { addBook } from "./services/books.service";

export default function ManageBook() {
  const [book, setBook] = useState<NewBook>({
    title: "",
    subject: "",
  });

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <>
      <h1>Add Book</h1>

      <form
        onSubmit={() => {
          addBook(book);
        }}
      >
        <Stack spacing={2}>
          <TextField
            name="title"
            label="Title"
            value={book.title}
            onChange={onChange}
          />
          <TextField
            name="subject"
            label="Subject"
            value={book.subject}
            onChange={onChange}
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      </form>
    </>
  );
}
