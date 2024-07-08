import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Spinner from "./Spinner";
import "@testing-library/jest-dom/vitest";

test("Snapshot Test", () => {
  const { container } = render(<Spinner />);
  expect(container).toMatchSnapshot();
});
