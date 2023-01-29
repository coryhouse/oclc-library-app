import { Button, CircularProgress, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book, NewBook } from "./Books";
import useBook from "./hooks/useBook";
import { addBook, editBook } from "./services/books.service";

type Status = "idle" | "submitting" | "submitted";

type Errors = Partial<NewBook>;

type Touched = {
  [key in keyof NewBook]?: boolean;
};

export default function ManageBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Touched>({});
  const [book, setBook] = useState<NewBook | Book>({
    title: "",
    subject: "",
  });
  const bookQuery = useBook(Number(id), setBook);

  // Derived state
  const isEditing = Boolean(id);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  }

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    setTouched({
      ...touched,
      [event.target.name]: true,
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

  if (isEditing && !bookQuery.data) return <CircularProgress />;

  return (
    <>
      <h1>{isEditing ? "Edit" : "Add"} Book</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault(); // prevent posting to server
          setStatus("submitting");
          const errorsExist = Object.keys(errors).length > 0;
          if (errorsExist) {
            setStatus("submitted");
            return;
          }
          if ("id" in book) {
            await editBook(book);
          } else {
            await addBook(book);
          }
          navigate("/");
        }}
      >
        <Stack spacing={2}>
          <TextField
            name="title"
            label="Title"
            value={book.title}
            onChange={onChange}
            error={
              (touched.title || status !== "idle") && Boolean(errors.title)
            }
            helperText={(touched.title || status !== "idle") && errors.title}
            onBlur={onBlur}
          />
          <TextField
            name="subject"
            label="Subject"
            value={book.subject}
            onChange={onChange}
            error={
              (touched.subject || status !== "idle") && Boolean(errors.subject)
            }
            helperText={
              (touched.subject || status !== "idle") && errors.subject
            }
            onBlur={onBlur}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Saving..." : "Save"}
          </Button>
        </Stack>
      </form>
    </>
  );
}
