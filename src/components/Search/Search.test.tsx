import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Search from "./Search";

const props = {
  setQuery: jest.fn(),
};
describe("<Search/>", () => {
  render(<Search {...props} />);
  it("search input", () => {
    const input: any = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });
});
