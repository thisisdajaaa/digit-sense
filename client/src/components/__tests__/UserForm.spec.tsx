import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserForm } from "../UserForm";

test("should match the UserForm snapshot properly", () => {
  const { container } = render(
    <Router>
      <UserForm
        mode="add"
        user={null}
        handleChange={() => () => {}}
        handleSubmit={() => {}}
      />
    </Router>
  );
  expect(container).toMatchSnapshot();
});
