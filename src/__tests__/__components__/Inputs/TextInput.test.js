import React from "react";
import { shallow } from "enzyme";
import TextInput from "../../../components/common/Inputs/TextInput";
const props = {
  type: "text",
  placeholder: "Email",
  onChange: jest.fn(),
  value: ""
};
describe("Login component", () => {
  let component;
  beforeEach(() => {
    component = shallow(<TextInput {...props} />);
  });
  test("should have input tag for email with initial state", () => {
    expect(component.props().value).toEqual("");
    expect(component.props().placeholder).toEqual("Email");
    component.simulate("change", {
      target: {
        name: "email",
        value: "luc.bayo@gmail.com"
      }
    });
    expect(component.props().onChange).toHaveBeenCalled();
  });
});
