import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import CategoryBar from "../../../components/common/AppBars/CategoryBar";

const props = {
  catList: ["Art"],
  onClick: jest.fn(),
  onMoreClick: jest.fn()
};
const wrapper = shallow(<CategoryBar {...props} />);

describe("Category Bar Component", () => {
  test("should match the snapshot", () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  test("should response to onClick", () => {
    wrapper
      .find(`[data-test="btn-more"]`)
      .at(0)
      .simulate("click");
    expect(props.onMoreClick).toBeCalled();
    wrapper
      .find(`[data-test="single-category"]`)
      .at(0)
      .simulate("click");
    expect(props.onClick).toBeCalled();
  });
});
