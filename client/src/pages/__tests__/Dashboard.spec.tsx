import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { DashboardScreen } from "../Dashboard";

test("should match the DashboardScreen snapshot properly", () => {
  const { container } = render(
    <Router>
      <DashboardScreen />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
