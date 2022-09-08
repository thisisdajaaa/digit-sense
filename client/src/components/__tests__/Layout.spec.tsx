import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "../Layout";

test("should match the Layout snapshot properly", () => {
  const { container } = render(
    <Router>
      <Layout pageTitle="test">
        <div>
          <h1>test</h1>
        </div>
      </Layout>
    </Router>
  );

  expect(container).toMatchSnapshot();
});
