import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "../Header";

test("should match the Header snapshot properly", () => {
  const { container } = render(
    <Router>
      <Header pageTitle="test" />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
