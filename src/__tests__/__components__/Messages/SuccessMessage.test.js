import React from "react";
import { shallow } from "enzyme";
import SuccessMessage from "../../../components/common/Message/success";

describe("SuccessMessage", () => {
  test("renders without crashing", () => {
    const component = shallow(<SuccessMessage title="success" />);
    expect(component.find(".success-msg").text()).toEqual("success");
  });
});
