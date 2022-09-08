import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginScreen } from "../Login";

test("should match the LoginScreen snapshot properly", () => {
  const { container } = render(
    <Router>
      <LoginScreen />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
