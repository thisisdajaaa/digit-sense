import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CreateUserScreen } from "../CreateUser";

test("should match the CreateUserScreen snapshot properly", () => {
  const { container } = render(
    <Router>
      <CreateUserScreen />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
