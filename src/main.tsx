import React from "react";
import ReactDOM from "react-dom/client";
import Books from "./Books";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManageBook from "./ManageBook";
import About from "./About";
import Navbar from "./reusable/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// TODO: This should be dynamically required in development only
import { worker } from "./mocks/browser";

const client = new QueryClient();

if (import.meta.env.VITE_ENABLE_MOCKS === "Y") {
  worker.start();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Navbar
          links={[
            {
              label: "Home",
              path: "/",
            },
            {
              label: "About",
              path: "/about",
            },
          ]}
        />
        <main>
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/about" element={<About />} />
            <Route path="/manage-book" element={<ManageBook />} />
            <Route path="/manage-book/:id" element={<ManageBook />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
