import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

function renderNavbar() {
  return render(
    <BrowserRouter>
      <Navbar links={[{ label: "Home", path: "/" }]} />
    </BrowserRouter>
  );
}

it("should render links", () => {
  renderNavbar();
  expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
});
