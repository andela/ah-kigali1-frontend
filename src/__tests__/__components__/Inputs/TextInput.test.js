import React from "react";
import toJson from "enzyme-to-json";
import { shallow } from "enzyme";
import TextInput from "../../../components/common/Inputs/TextInput";

const props = {
  type: "text",
  name: "email",
  placeholder: "Email",
  onChange: jest.fn(),
  value: ""
};
describe("Login component", () => {
  let component;
  beforeEach(() => {
    component = shallow(<TextInput {...props} />);
  });
  test("should match the snapshot", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
  test("should have input tag for email with initial state", () => {
    expect(component.props().value).toEqual("");
    expect(component.props().placeholder).toEqual("Email");
    component.simulate("change", {
      target: {
        name: "email",
        value: "me@example.com"
      }
    });
    expect(component.props().onChange).toHaveBeenCalled();
  });
});
