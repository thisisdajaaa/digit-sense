import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { EditUserScreen } from "../EditUser";

test("should match the EditUserScreen snapshot properly", () => {
  const { container } = render(
    <Router>
      <EditUserScreen />
    </Router>
  );

  expect(container).toMatchSnapshot();
});
