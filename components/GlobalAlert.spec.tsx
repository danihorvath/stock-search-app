import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import GlobalAlert from "./GlobalAlert";

test("Snapshot Test", () => {
  const { container } = render(<GlobalAlert />);
  expect(container).toMatchSnapshot();
});
