import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import SocialButton from "../../../components/common/Buttons/SocialButton";

const setUp = props => shallow(<SocialButton {...props} />);
const props = {
  iconName: "fb",
  alt: "fb"
};
describe("SocialButton", () => {
  let component;
  beforeEach(() => {
    component = setUp(props);
  });
  it("should render SocialButton component", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
});
