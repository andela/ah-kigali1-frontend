import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("App component ", () => {
  test("should have home component", () => {
    const warper = shallow(<App />);
    expect(warper.exists(".app-container")).toEqual(false);
  });
});
