import { shallow } from "enzyme";
import React from "react";
import {
  Article,
  mapDispatchToProps,
  mapStateToProps
} from "../../views/ReadArticle";
import { props1, props2, props3, props4, props5 } from "../__mocks__/testData";

jest.useFakeTimers();
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
    expect(mapStateToProps(state)).toEqual({
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

  test("should display more reactions model", () => {
    const wrapper = shallow(<Article {...props1} />);
    wrapper.instance().toggleReportingModal();
    expect(wrapper.state().reportingForm).toEqual(true);
    wrapper.instance().toggleReportingModal();
    expect(wrapper.state().reportingForm).toEqual(false);
  });

  test("should display reporting form ", () => {
    const wrapper = shallow(<Article {...props1} />);
    wrapper.instance().toggleReactionsModal();
    expect(wrapper.state().displayModal).toEqual(true);
    wrapper.instance().toggleReactionsModal();
    expect(wrapper.state().displayModal).toEqual(false);
  });

  test("should redirect to edit article ", () => {
    const wrapper = shallow(<Article {...props1} />);
    wrapper.instance().redirectToEdit();
    expect(props1.history.push).toHaveBeenCalled();
  });

  test("should test the presence of edit and deleting buttons", () => {
    const wrapper = shallow(<Article {...props1} />);
    expect(wrapper.find(".delete_article")).toHaveLength(1);
  });

  test("should test deleting an article", async () => {
    const wrapper = shallow(<Article {...props1} />);
    await props1.deleteOneArticle.mockResolvedValue({ status: 200 });
    wrapper
      .find(".delete_article")
      .at(0)
      .simulate("click");
    expect(props1.history.push).toHaveBeenCalled();
  });

  test("should test deleting an article", async () => {
    const wrapper = shallow(<Article {...props2} />);
    props2.deleteOneArticle.mockClear();
    await props2.deleteOneArticle.mockResolvedValue({ status: 400 });
    wrapper.find(".delete_article").simulate("click");
    expect(props2.history.push).not.toHaveBeenCalled();
  });
});
