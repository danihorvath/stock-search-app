import { expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchField from "./SearchField";

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

test("Snapshot Test", () => {
  const { container } = render(<SearchField />);
  expect(container).toMatchSnapshot();
});
