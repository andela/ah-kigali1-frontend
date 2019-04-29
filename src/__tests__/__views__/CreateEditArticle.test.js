import React from "react";
import { shallow } from "enzyme";
import {
  Article,
  mapDispatchToProps,
  mapStateToProps
} from "../../views/CreateEditHolder";
import { article, article1, article2, article3 } from "../__mocks__/testData";

const shallowSetup = (pathname = "/articles/new", articleFields) => {
  const props = {
    article: {
      ...articleFields
    },
    history: {
      push: jest.fn(),
      location: {
        pathname
      }
    },
    match: {
      params: {
        slug: "hello-world"
      }
    },
    response: "",
    fetchArticleToEdit: jest.fn(),
    createArticle: jest.fn(),
    editOneArticle: jest.fn()
  };
  const wrapper = shallow(<Article {...props} />);
  return { wrapper, props };
};

describe("Create/Edit article", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.runAllTimers();
  });
  test("should render the creating article interface", () => {
    const { wrapper } = shallowSetup(undefined, article);
    expect(wrapper.find(".cancel")).toHaveLength(0);
  });

  test("should call oninput change method ", () => {
    const { wrapper } = shallowSetup(undefined, article);
    wrapper.find(".title__input").simulate("change", {
      target: { value: "hello world", name: "title" }
    });
    expect(wrapper.state().title).toEqual("hello world");
  });

  test("should call create article method with correct input ", () => {
    const { wrapper, props } = shallowSetup(undefined, article);
    wrapper.find(".title__input").simulate("change", {
      target: { value: "hello world", name: "title" }
    });
    wrapper.instance().onEditorChange(article.body);
    wrapper.find(".description__input").simulate("change", {
      target: { value: "hello world", name: "description" }
    });
    wrapper.find(".publish").simulate("click");
    expect(props.createArticle).toHaveBeenCalled();
  });
  test("should call edit article method with correct input ", () => {
    const { wrapper, props } = shallowSetup(
      "/articles/helloWorld/edit",
      article
    );
    wrapper.setState({ edit: true, isFetching: false });
    wrapper.update();
    wrapper.find(".title__input").simulate("change", {
      target: { value: "hello world", name: "title" }
    });
    wrapper.instance().onEditorChange(article.body);
    wrapper.find(".description__input").simulate("change", {
      target: { value: "hello world", name: "description" }
    });
    wrapper.find(".publish").simulate("click");
    expect(props.editOneArticle).toHaveBeenCalled();
  });
  test("should cancel edit ", () => {
    const { wrapper, props } = shallowSetup(
      "/articles/helloWorld/edit",
      article3
    );
    expect(props.fetchArticleToEdit).toHaveBeenCalledWith("hello-world");
    wrapper.instance().cancelEdit();
    expect(props.history.push).toHaveBeenCalledWith("/");
  });
  test("should not call edit article method with empty title", () => {
    const { wrapper, props } = shallowSetup(undefined, article1);
    wrapper.find(".title__input").simulate("change", {
      target: { value: "" }
    });
    wrapper.find(".publish").simulate("click");
    expect(wrapper.find(".error").text()).toEqual("<ErrorMessage />");
    expect(props.editOneArticle).not.toHaveBeenCalled();
  });

  test("should not call edit article method with short body", () => {
    const { wrapper, props } = shallowSetup(undefined, article3);
    wrapper.instance().onEditorChange("hello world");
    wrapper.find(".publish").simulate("click");
    expect(wrapper.find(".error").text()).toEqual("<ErrorMessage />");
    expect(props.editOneArticle).not.toHaveBeenCalled();
  });
  test("should not edit article method with no description", () => {
    const { wrapper, props } = shallowSetup(undefined, article2);
    wrapper.find(".publish").simulate("click");
    expect(props.editOneArticle).not.toHaveBeenCalled();
  });
  test("should handle editor changes", () => {
    const { wrapper } = shallowSetup(article);
    wrapper.instance().onEditorChange("hello world");
    expect(wrapper.state().value).toEqual("hello world");
  });
  test("should add tag in state", () => {
    const { wrapper } = shallowSetup(undefined, article);
    wrapper
      .find(".tag")
      .simulate("change", { target: { value: "hello world", name: "tag" } });
    expect(wrapper.state().tag).toEqual("hello world");
  });
  test("should add new tag in tagsList", () => {
    const { wrapper } = shallowSetup(undefined, article);
    wrapper.find(".tag").simulate("change", {
      target: { value: "hello world", name: "tag" }
    });
    wrapper.find(".tag").simulate("keyDown", { keyCode: 13 });
    expect(wrapper.state().tagsList).toEqual(["hello world"]);
  });
  test("should not add an empty tag", () => {
    const { wrapper } = shallowSetup(undefined, article);
    wrapper.instance().handleNewTag({ keyCode: 13 });
    expect(wrapper.state().tagsList).toEqual([]);
  });
  test("should handle removing tag", () => {
    const { wrapper } = shallowSetup(undefined, article);
    wrapper.find(".tag").simulate("change", {
      target: { value: "hello world", name: "tag" }
    });
    wrapper.instance().onRemoveTag("hello world");
    expect(wrapper.state().tagsList).toEqual([]);
  });
});

describe("Component lifecycle method", () => {
  test("should call componentWillReceiveProps with same records as previous ones", () => {
    const { wrapper } = shallowSetup(undefined, article);
    wrapper.instance().componentWillReceiveProps({
      article
    });
    expect(wrapper.state().title).toEqual("");
    expect(wrapper.state().description).toEqual("");
  });
  test("should call componentWillReceiveProps with different props", () => {
    const { wrapper } = shallowSetup(undefined, article);
    wrapper.instance().componentWillReceiveProps({
      article: article3
    });
    expect(wrapper.state().title).toEqual("Hello world");
    expect(wrapper.state().description).toEqual("Hello world");
  });
  test("should call componentWillReceiveProps with article error", () => {
    jest.useFakeTimers();
    jest.runAllTimers();
    const { wrapper } = shallowSetup(undefined, article);
    wrapper.instance().componentWillReceiveProps({
      articleError: "Sorry, we can not authenticate you"
    });
    expect(wrapper.state().error).toEqual("Sorry, we can not authenticate you");
  });
});

describe("Edit/create article mapDispatchToProps", () => {
  test("should return fetching the article to edit ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchArticleToEdit("hello-world");
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
  test("should return fetching creating article ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).createArticle(article);
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
  test("should return editing one article ", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).editOneArticle(article, "hello-world");
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });
});

describe("Edit/create article mapStateToProps", () => {
  test("should return responses passed", () => {
    expect(
      mapStateToProps({
        newArticle: {
          article: {
            response: "Article error"
          }
        },
        auth: {
          currentUser: {
            username: "username"
          }
        }
      })
    ).toEqual({
      message: undefined,
      response: undefined,
      articleError: undefined,
      currentUser: {
        username: "username"
      },
      article: {
        response: "Article error"
      }
    });
  });
});
