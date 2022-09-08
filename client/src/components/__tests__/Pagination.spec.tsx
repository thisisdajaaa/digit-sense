import { render } from "@testing-library/react";
import { Pagination } from "../Pagination";

test("should match the Pagination snapshot properly", () => {
  const { container } = render(
    <Pagination count={5} page={1} rowsPerPage={5} onPageChange={() => {}} />
  );

  expect(container).toMatchSnapshot();
});
