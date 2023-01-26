import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewBook } from "./Books";
import { addBook } from "./services/books.service";

type Status = "idle" | "submitting" | "submitted";

type Errors = Partial<NewBook>;

export default function ManageBook() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");
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

  function getErrors() {
    const errors: Errors = {};
    if (!book.title) {
      errors.title = "Title is required";
    }
    if (!book.subject) {
      errors.subject = "Subject is required";
    }
    return errors;
  }

  // Derived state
  const errors = getErrors();

  return (
    <>
      <h1>Add Book</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault(); // prevent posting to server
          setStatus("submitting");
          const errorsExist = Object.keys(errors).length > 0;
          if (errorsExist) {
            setStatus("submitted");
            return;
          }
          await addBook(book);
          navigate("/");
        }}
      >
        <Stack spacing={2}>
          <TextField
            name="title"
            label="Title"
            value={book.title}
            onChange={onChange}
            error={status !== "idle" && Boolean(errors.title)}
            helperText={status !== "idle" && errors.title}
          />
          <TextField
            name="subject"
            label="Subject"
            value={book.subject}
            onChange={onChange}
            error={status !== "idle" && Boolean(errors.subject)}
            helperText={status !== "idle" && errors.subject}
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      </form>
    </>
  );
}
