import { Button, TextField } from "@mui/material";
import { Stack } from "@mui/system";

export default function ManageBook() {
  return (
    <>
      <h1>Add Book</h1>

      <form
        onSubmit={() => {
          //
        }}
      >
        <Stack spacing={2}>
          <TextField label="Title" />
          <TextField label="Subject" />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Stack>
      </form>
    </>
  );
}
