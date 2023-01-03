import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders the footer", () => {
  render(<Footer />);

  expect(screen.getByRole("link")).toHaveTextContent("Github Repository");
  expect(screen.getByRole("link")).toHaveAttribute("href", "https://github.com/leonardo-asad/E-Commerce");
});
