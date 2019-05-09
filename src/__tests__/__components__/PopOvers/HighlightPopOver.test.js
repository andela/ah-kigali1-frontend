import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import HighlighPopover from "../../../components/PopOvers/HighlighPopover";

const onClick = jest.fn();
const onHighlight = jest.fn();
const props = {
  onClick,
  onHighlight
};
const component = shallow(<HighlighPopover {...props} />);
describe("Highlight Popover", () => {
  test("should match the snapshot", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
  test("should response on click", () => {
    component
      .find(`[data-test="button-set"]`)
      .at(0)
      .simulate("click");
    expect(onHighlight).toBeCalled();
    component
      .find(`[data-test="button-set"]`)
      .at(1)
      .simulate("click");
    expect(onClick).toBeCalled();
  });
});
