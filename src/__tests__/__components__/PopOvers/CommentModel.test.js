import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import { CommentModel } from "../../../components/PopOvers/CommentModel";
import Button from "../../../components/common/Buttons/FormButton";

const onClose = jest.fn();
const props = {
  isOpen: false,
  onClose,
  id: "the-comment-model"
};
const component = shallow(<CommentModel {...props} />);
describe("Comment PopUp Model", () => {
  const instance = component.instance();
  beforeEach(() => {
    jest.spyOn(instance, "componentWillReceiveProps");
    jest.spyOn(component.instance(), "closeModel");
  });
  afterEach(() => {
    instance.componentWillReceiveProps.mockClear();
    instance.closeModel.mockClear();
  });
  test("should match the snapshot", () => {
    expect(toJson(component)).toMatchSnapshot();
  });
  test("should render button and text area input", () => {
    expect(component.find(Button).length).toBe(1);
    expect(component.find(`[data-test="comment-model-input"]`).length).toBe(1);
  });
  test("should not update the state on opening model", () => {
    component.setProps({
      isOpen: true
    });
    component.update();
    expect(instance.componentWillReceiveProps).toBeCalled();
    expect(instance.closeModel).not.toBeCalled();
  });
  test("should update state on text input change", () => {
    component.setProps({
      isOpen: true
    });
    const input = component.find(`[data-test="comment-model-input"]`).at(0);
    const event = {
      target: {
        value: `I don't know who I am, but it working in my favor!!`
      }
    };
    input.simulate("change", event);
    expect(component.state().comment).toEqual(event.target.value);
  });
  test("should close model and update the comment", () => {
    const closeBtn = component.find(`[data-test="close-btn"]`).at(0);
    closeBtn.simulate("click");
    expect(onClose).toBeCalled();
    component.setProps({
      isOpen: false
    });
    component.update();
    expect(component.state().comment).toBe("");
  });
});
