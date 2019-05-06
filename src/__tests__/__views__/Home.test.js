import React from "react";
import { mount } from "enzyme";
import App from "../../App";

const props = {
  suggestedArticles: {}
};
describe("Home component", () => {
  test("matches the snapshot", () => {
    const warper = mount(<App {...props} />);
    expect(warper.find("h2").text()).toEqual("Hello home");
    expect(true).toBe(true);
  });
});
