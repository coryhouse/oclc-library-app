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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/about" element={<About />} />
          <Route path="/manage-book" element={<ManageBook />} />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>
);
