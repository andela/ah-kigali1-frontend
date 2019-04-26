import { shallow } from "enzyme";
import React from "react";
import RichTextEditor from "react-rte";
import { article, article1, article3 } from "../__mocks__/testData";
import { mapDispatchToProps, CreateArticle } from "../../views/NewArticle";

import Input from "../../components/common/Inputs/TextInput";
import { NEW_TAG, INPUT_CHANGE, REMOVE_TAG } from "../../redux/actionTypes";

const shallowSetup = values => {
  const props = {
    article: { ...values },
    isSubmitting: false,
    onInputChange: jest.fn(),
    createArticle: jest.fn(),
    handleRemoveTag: jest.fn(),
    newTag: jest.fn()
  };
  const wrapper = shallow(<CreateArticle {...props} />);
  return { props, wrapper };
};
describe("Interface for creating article", () => {
  test("should render interface for creating article", () => {
    const { wrapper } = shallowSetup(article);

    expect(wrapper.find(".main-article")).toHaveLength(1);
    expect(wrapper.find(".title")).toHaveLength(1);
    expect(wrapper.find(Input)).toHaveLength(3);
    expect(wrapper.containsMatchingElement(<RichTextEditor />)).toBe(true);
  });
});

describe("Creating article interactions", () => {
  test("should call oninput change method ", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.find(".title__input").simulate("change", {
      target: { value: "hello world", name: "title" }
    });
    expect(props.onInputChange).toHaveBeenCalledWith({
      value: "hello world",
      name: "title"
    });
  });
  test("should call on input method without name ", () => {
    const { wrapper, props } = shallowSetup(article);

    wrapper.find(".title__input").simulate("change", {
      target: { value: "hello world" }
    });
    expect(props.onInputChange).toHaveBeenCalledWith({
      value: "hello world"
    });
  });
  test("should call create article method with correct input ", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.find(".publish").simulate("click");
    expect(props.createArticle).toHaveBeenCalled();
  });
  test("should not call create article method with empty title", () => {
    const { wrapper, props } = shallowSetup(article1);
    wrapper.find(".publish").simulate("click");
    expect(wrapper.find(".error").text()).toEqual("<ErrorMessage />");
    expect(props.createArticle).not.toHaveBeenCalled();
  });
  test("should not call create article method with short body", () => {
    const { wrapper, props } = shallowSetup(article3);
    wrapper.find(".publish").simulate("click");
    expect(wrapper.find(".error").text()).toEqual("<ErrorMessage />");
    expect(props.createArticle).not.toHaveBeenCalled();
  });
  test("should not call create article method with no description", () => {
    const { wrapper, props } = shallowSetup(article3);
    wrapper.find(".publish").simulate("click");
    expect(props.createArticle).not.toHaveBeenCalled();
  });
  test("should handle editor changes", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.instance().onEditorChange("hello world");
    expect(props.onInputChange).toHaveBeenCalledWith({
      name: "body",
      value: "hello world"
    });
  });
  test("should handle  tagInput changes in state", () => {
    const { wrapper } = shallowSetup(article);
    wrapper.instance().onTagInputChange({ target: { value: "hello world" } });
    expect(wrapper.state().tag).toEqual("hello world");
  });

  test("should add a new tag in store", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.find(".tag").simulate("change", {
      target: { value: "hello world" }
    });
    wrapper.instance().handleNewTag({ keyCode: 13 });
    expect(props.newTag).toHaveBeenCalledWith({ tag: "hello world" });
  });
  test("should handle adding an empty tag", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.instance().handleNewTag({ keyCode: 13 });
    expect(props.newTag).not.toHaveBeenCalled();
  });
  test("should handle removing a tag", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.instance().onRemoveTag("hello world");
    expect(props.handleRemoveTag).toHaveBeenCalledWith("hello world");
  });
});

describe("Mapping dispatch to props new article", () => {
  test("should return the action of changing input ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).onInputChange({
      name: "body",
      value: "hello world"
    });
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: INPUT_CHANGE,
      payload: {
        field: "body",
        value: "hello world"
      }
    });
  });
  test("should return the adding a new tag ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).newTag({ tag: "politics" });
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: NEW_TAG,
      payload: "politics"
    });
  });
  test("should return removing a tag ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).handleRemoveTag("politics");
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: REMOVE_TAG,
      payload: "politics"
    });
  });
  test("should return creating an article ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).createArticle(article);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});
