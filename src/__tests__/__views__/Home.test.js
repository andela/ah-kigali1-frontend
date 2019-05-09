import React from "react";
import { mount } from "enzyme";
import App from "../../App";

const props = {
  suggestedArticles: {}
};
describe("Home component", () => {
  test("matches the snapshot", () => {
    const wrapper = mount(<App {...props} />);
    expect(wrapper.find("h2").text()).toEqual("Hello home");
    expect(true).toBe(true);
  });
});
