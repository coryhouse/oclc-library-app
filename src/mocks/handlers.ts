import { rest } from "msw";
import { Book } from "../Books";

export const handlers = [
  rest.get("http://localhost:3001/books", (req, res, ctx) => {
    const resp: Book[] = [
      {
        id: 1,
        title: "The Great Gatsby",
        subject: "Fiction",
      },
      {
        id: 2,
        title: "The Lord of the Rings",
        subject: "Fantasy",
      },
    ];

    // Alternative response
    // const resp: Book[] = [];

    return res(ctx.status(200), ctx.delay(1000), ctx.json(resp));
  }),
];
