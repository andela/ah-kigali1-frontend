import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import Social from "../../../components/common/Link/Social";

const props = {
  image: "../../../components/common/Link/Social",
  href: "../../../components/common/Link/Social"
};

describe("Social button", () => {
  let component;
  beforeEach(() => {
    component = shallow(<Social {...props} />);
  });
  test("should match the snapshot", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
  test("should render button", () => {
    window.open = jest.fn();
    component.simulate("click");
    expect(window.open).toHaveBeenCalled();
  });
});
