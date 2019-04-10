import React from "react";
import { shallow } from "enzyme";
import BasicButton from "../../../components/common/Buttons/BasicButton";

const setUp = (prop = {}) => {
  return shallow(<BasicButton {...prop} />);
};
const props = {
  className: "btn btn-lock",
  title: "Submit",
  onClick: jest.fn()
};
describe("Basic button", () => {
  let component;
  beforeEach(() => {
    component = setUp(props);
  });
  test("should render button", () => {
    expect(component.props().title).toEqual(props.title);
    expect(component.hasClass(props.className)).toBe(true);
    expect(component.props().onClick).toBeDefined();
    component.simulate("click");
    expect(component.props().onClick).toHaveBeenCalledTimes(1);
  });
});
