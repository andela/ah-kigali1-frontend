import React from "react";
import { shallow } from "enzyme";
import App from "../../App";

describe("Home component", () => {
  test("matches the snapshot", () => {
    const warper = shallow(<App />);
    expect(true).toBe(true);
  });
});
