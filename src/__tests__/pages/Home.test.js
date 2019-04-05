import React from "react";
import { shallow } from "enzyme";
import Home from "../../views/Home";

describe("Home component", () => {
  test("matches the snapshot", () => {
    const warper = shallow(<Home />);
    expect(warper.find("h2").text()).toEqual("Hello world, from Titan-Devs");
  });
});
