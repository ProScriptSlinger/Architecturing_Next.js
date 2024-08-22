import { render, screen } from "@testing-library/react";
import Header from "../../components/Header";

describe("Header", () => {
  it("renders the header", () => {
    render(<Header />);
    const headerElement = screen.getByText(/Header/i);
    expect(headerElement).toBeInTheDocument();
  });
});
