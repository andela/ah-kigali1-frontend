import React from "react";
import { shallow } from "enzyme";
import FormButton from "../../../components/common/Buttons/FormButton";

const setUp = props => shallow(<FormButton {...props} />);
const props = {
  value: "Submit",
  onClick: jest.fn()
};
describe("Basic button", () => {
  let component;
  beforeEach(() => {
    component = setUp(props);
  });
  test("should render button", () => {
    expect(component.props().value).toEqual(props.value);
    expect(component.props().type).toEqual("button");
    component.simulate("click");
    expect(component.props().onClick).toHaveBeenCalledTimes(1);
  });
});
