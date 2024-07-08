import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import PageHeader from "./PageHeader";

const mock = {
  title: "Page Title",
  subtitle: "Page Subtitle",
  children: <div>Children</div>,
  goBack: "/",
};

test("Snapshot Test", () => {
  const { container } = render(<PageHeader {...mock} />);
  expect(container).toMatchSnapshot();
});
