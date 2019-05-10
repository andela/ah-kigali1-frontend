import React from "react";
import { shallow } from "enzyme";
import {
  EditArticle,
  mapDispatchToProps,
  mapStateToProps
} from "../../views/EditArticle";
import { article, article1, article2, article3 } from "../__mocks__/testData";
import { NEW_TAG, INPUT_CHANGE, REMOVE_TAG } from "../../redux/actionTypes";

const shallowSetup = articleFields => {
  const props = {
    article: {
      ...articleFields
    },
    history: {
      push: jest.fn()
    },
    match: {
      params: {
        slug: "hello-world"
      }
    },
    response: "",
    onInputChange: jest.fn(),
    fetchArticleToEdit: jest.fn(),
    newTag: jest.fn(),
    editOneArticle: jest.fn(),
    handleRemoveTag: jest.fn()
  };
  const wrapper = shallow(<EditArticle {...props} />);
  return { wrapper, props };
};

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

  test("should call edit article method with correct input ", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.find(".publish").simulate("click");
    expect(props.editOneArticle).toHaveBeenCalled();
  });

  test("should cancel edit ", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.find(".cancel").simulate("click");
    expect(props.history.push).toHaveBeenCalled();
  });

  test("should not call edit article method with empty title", () => {
    const { wrapper, props } = shallowSetup(article1);
    wrapper.find(".title__input").simulate("change", {
      target: { value: "" }
    });
    wrapper.find(".publish").simulate("click");
    expect(wrapper.find(".error").text()).toEqual("<ErrorMessage />");
    expect(props.editOneArticle).not.toHaveBeenCalled();
  });

  test("should not call edit article method with short body", () => {
    const { wrapper, props } = shallowSetup(article3);
    wrapper.instance().onEditorChange("hello world");
    wrapper.find(".publish").simulate("click");
    expect(wrapper.find(".error").text()).toEqual("<ErrorMessage />");
    expect(props.editOneArticle).not.toHaveBeenCalled();
  });

  test("should not edit article method with no description", () => {
    const { wrapper, props } = shallowSetup(article2);
    wrapper.find(".publish").simulate("click");
    expect(props.editOneArticle).not.toHaveBeenCalled();
  });

  test("should handle editor changes", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.instance().onEditorChange("hello world");
    expect(props.onInputChange).toHaveBeenCalledWith({
      name: "body",
      value: "hello world"
    });
  });
  test("should add tag in state", () => {
    const { wrapper } = shallowSetup(article);
    wrapper.instance().onTagInputChange({ target: { value: "hello world" } });
    expect(wrapper.state().tag).toEqual("hello world");
  });

  test("should add new tag in redux store", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.find(".tag").simulate("change", {
      target: { value: "hello world" }
    });
    wrapper.instance().handleNewTag({ keyCode: 13 });
    expect(props.newTag).toHaveBeenCalledWith({ tag: "hello world" });
  });
  test("should not add an empty tag", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.instance().handleNewTag({ keyCode: 13 });
    expect(props.newTag).not.toHaveBeenCalled();
  });

  test("should handle removing tag", () => {
    const { wrapper, props } = shallowSetup(article);
    wrapper.instance().onRemoveTag("hello world");
    expect(props.handleRemoveTag).toHaveBeenCalledWith("hello world");
  });
});

describe("Component lifecycle method", () => {
  test("should call componentWillReceiveProps with same records as previous ones", () => {
    const { wrapper } = shallowSetup(article);
    wrapper.instance().componentWillReceiveProps({
      article
    });
    expect(wrapper.state().title).toEqual("Hello world");
    expect(wrapper.state().description).toEqual("Hello world");
  });

  test("should call componentWillReceiveProps with different props", () => {
    const { wrapper } = shallowSetup(article);
    wrapper.instance().componentWillReceiveProps({
      article: article3
    });
    expect(wrapper.state().title).toEqual("Hello world");
    expect(wrapper.state().description).toEqual("Hello world");
  });

  test("should call componentWillReceiveProps with article error", () => {
    const { wrapper } = shallowSetup(article);
    wrapper.instance().componentWillReceiveProps({
      article: {
        article_error: "Sorry, we can not authenticate you"
      }
    });
    expect(wrapper.state().error).toEqual("Sorry, we can not authenticate you");
  });
});

describe("Edit article mapDispatchToProps", () => {
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

  test("should return fetching the article to edit ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchArticleToEdit("hello-world");
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  test("should return editing one article ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).editOneArticle(article, "hello-world");
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});

describe("Edit article mapStateToProps", () => {
  test("should response, and own props passed to mapStateToProps", () => {
    expect(
      mapStateToProps(
        {
          article: {
            response: "Article error"
          }
        },
        { message: "hello world" }
      )
    ).toEqual({
      response: "Article error",
      article: {
        response: "Article error"
      },
      message: "hello world"
    });
  });
});
