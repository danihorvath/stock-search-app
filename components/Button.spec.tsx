import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import "@testing-library/jest-dom/vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

test("Snapshot Test", () => {
  const { container } = render(
    <Button onClick={() => {}} type="submit">
      Submit
    </Button>
  );
  expect(container).toMatchSnapshot();
});

test("Button renders correctly", () => {
  render(<Button>Click me</Button>);
  const buttonElement = screen.getByRole("button", { name: "Click me" });
  expect(buttonElement).toBeInTheDocument();
});

test("Button calls onClick handler when clicked", () => {
  const onClickMock = vi.fn();
  render(<Button onClick={onClickMock}>Click me</Button>);
  const buttonElement = screen.getByRole("button", { name: "Click me" });
  buttonElement.click();
  expect(onClickMock).toHaveBeenCalled();
});

test("Button has correct type", () => {
  render(<Button type="submit">Submit</Button>);
  const buttonElement = screen.getByRole("button", { name: "Submit" });
  expect(buttonElement).toHaveAttribute("type", "submit");
});
