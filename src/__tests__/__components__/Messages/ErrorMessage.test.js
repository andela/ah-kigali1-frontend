import React from "react";
import { shallow } from "enzyme";
import ErrorMessage from "../../../components/common/Message/error";

describe("ErrorMessage", () => {
  test("renders without crashing", () => {
    const component = shallow(<ErrorMessage title="error" />);
    expect(component.find(".error-msg").text()).toEqual("error");
  });
});
