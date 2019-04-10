import React from "react";
import { shallow } from "enzyme";
import Message from "../../../components/common/Message/message";

const props = {
  title: "hello world",
  classType: "btn btn-info",
  icons: "fa fa-close"
};

describe("Message", () => {
  test("renders without crashing", () => {
    const component = shallow(<Message {...props} />);
    expect(component.props().className).toEqual("btn btn-info");
  });
});
