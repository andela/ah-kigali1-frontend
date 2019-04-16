import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Logo from "../../../components/common/Logo";

const warper = shallow(<Logo className="logo" />);
describe("Logo component", () => {
  it("matches the snapshot", () => {
    expect(toJson(warper)).toMatchSnapshot();
  });
});
