import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ProfileScreen } from "../Profile";

test("should match the ProfileScreen snapshot properly", () => {
  const { container } = render(
    <Router>
      <ProfileScreen />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
