import React from "react";
import renderer from "react-test-renderer";
import Home from "./Home";

describe("Home component", () => {
  test("it matches the snapshot", () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
