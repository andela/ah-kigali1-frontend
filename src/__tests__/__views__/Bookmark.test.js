import "@babel/polyfill";
import React from "react";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import {
  Bookmark,
  mapStateToProps,
  mapDispatchToProps
} from "../../views/Bookmark";
import { initialState } from "../../redux/reducers/bookmarkReducers";

const setup = () => {
  const props = {
    bookmark: jest.fn(),
    isBookmarked: false,
    slug: "a-fake-slug",
    bookmarkedArticles: {},
    isSubmitting: false,
    disabled: false,
    location: { pathname: "a-fake-path" },
    history: []
  };
  const enzymeWrapper = mount(<Bookmark {...props} />);

  return {
    props,
    enzymeWrapper
  };
};

describe("test bookmark component", () => {
  const { props } = setup();
  const bookmarkComponent = mount(<Bookmark {...props} />);
  let instance;

  beforeEach(() => {
    instance = bookmarkComponent.instance();
    jest.spyOn(instance.props, "bookmark");
    instance.forceUpdate();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("snapshot testing for the component", () => {
    expect(toJson(bookmarkComponent)).toMatchSnapshot();
    expect(bookmarkComponent).toBeTruthy();
  });

  describe("handle event on bookmark icon", () => {
    test("should handle click bookmark event ", () => {
      const bookmarkImg = bookmarkComponent.find("img");
      bookmarkImg.simulate("click", {});
      expect(instance.props.bookmark).toHaveBeenCalled();
    });

    test("should handle cancel bookmark if bookmarked", () => {
      Object.assign(props, {
        isBookmarked: true,
        bookmarkedArticles: { "a-fake-slug": true }
      });
      const bookmarkedComponent = mount(<Bookmark {...props} />);
      const bookmarkedImg = bookmarkedComponent.find("img");
      bookmarkedImg.simulate("click", {});
      expect(instance.props.bookmark).toHaveBeenCalled();
    });
  });

  describe("test map state to props and map dispatch to props", () => {
    test("should test map state to props", () => {
      expect(mapStateToProps({ bookmark: initialState })).toEqual({
        isSubmitting: false,
        message: "",
        bookmarkedArticles: {}
      });
    });

    test("should test map dispatch to props for bookmark", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).bookmark("a-fake-one", false, {
        location: { pathname: "/next/test/url" },
        history: []
      });
      expect(dispatch.mock.calls[0][0]).toBeInstanceOf(Function);
    });
  });
});
