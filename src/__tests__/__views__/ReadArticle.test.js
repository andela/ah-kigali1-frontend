import { shallow } from "enzyme";
import React from "react";
import {
  Article,
  mapDispatchToProps,
  mapStateToProps
} from "../../views/ReadArticle";
import { props1, props2, props3, props4, props5 } from "../__mocks__/testData";

describe(" Read article", () => {
  test("render the full component with aside articles", () => {
    const wrapper = shallow(<Article {...props1} />);

    expect(wrapper.find(".article-container")).toHaveLength(1);
    expect(wrapper.find(".article-other")).toHaveLength(1);
  });
  test("render the component without aside articles, firstName, and lastName", () => {
    const wrapper = shallow(<Article {...props2} />);

    expect(wrapper.find(".article-container")).toHaveLength(1);
  });
  test("render the component while it is still fetching", () => {
    const wrapper = shallow(<Article {...props3} />);
    expect(wrapper.find(".article-container")).not.toHaveLength(1);
  });
  test("render the component without article", () => {
    const wrapper = shallow(<Article {...props4} />);
    expect(wrapper.find(".success-message")).toHaveLength(1);
  });
  test("render the component without comments and tags", () => {
    const wrapper = shallow(<Article {...props5} />);
    expect(wrapper.find(".article-container")).toHaveLength(1);
  });
  test("should map states to props", () => {
    const state = {
      login: {
        currentUser: {
          username: "yves"
        }
      },
      fetchedArticle: {
        asideArticles: {
          articles: [{ body: "hello world" }, { body: "hello world" }]
        }
      }
    };
    expect(mapStateToProps(state, { message: "articles retrieved" })).toEqual({
      message: "articles retrieved",
      currentUser: {
        username: "yves"
      },
      asideArticles: {
        articles: [{ body: "hello world" }, { body: "hello world" }]
      },
      article: state.fetchedArticle
    });
  });
  test("should map delete article  to props", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).deleteOneArticle("hello world");
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  test("should map fetch article to props", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).fetchOneArticle("hello world");
    expect(dispatch.mock.calls[0][0]).toBeDefined();
  });

  test("should redirect to another article", () => {
    const wrapper = shallow(<Article {...props1} />);
    wrapper.instance().componentWillReceiveProps({
      match: {
        params: { slug: "hello-world" }
      }
    });
    expect(props1.fetchOneArticle).toHaveBeenCalledWith("hello-world");
    const secondCall = wrapper.instance().componentWillReceiveProps({
      match: {
        params: { slug: "juventus-vs-manu" }
      }
    });
    expect(secondCall).toEqual(false);
  });
});
