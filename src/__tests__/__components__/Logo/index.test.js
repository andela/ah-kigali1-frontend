import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Logo from "../../../components/common/Logo";

const wrapper = shallow(<Logo className="logo" />);
describe("Logo component", () => {
  test("matches the snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
