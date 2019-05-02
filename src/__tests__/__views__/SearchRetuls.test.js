import React from "react";
import toJson from "enzyme-to-json";
import _ from "lodash";
import { shallow, mount } from "enzyme";
import { SearchResults } from "../../views/SearchResults";
import AnimatedCard from "../../components/common/Cards/AnimatedCard";
import TextInput from "../../components/common/Inputs/TextInput";
import { articles, authors } from "../testData";
import AuthorCard from "../../components/common/Cards/AuthorCard";

const [handleInputChange, fetchResults, clearSearchResults, push] = new Array(
  4
).fill(jest.fn());
const props = {
  handleInputChange,
  fetchResults,
  clearSearchResults,
  searchQuery: "hello_world",
  articles: {},
  authors: {},
  history: {
    location: {
      search: "?keyword=helloWorld"
    },
    push
  },
  isLoading: true,
  errors: {}
};
const wrapper = shallow(<SearchResults {...props} />);
const findElements = element => wrapper.find(element);
describe("Search Results Component", () => {
  afterEach(() => {
    handleInputChange.mockClear();
    fetchResults.mockClear();
  });
  describe("rendered component", () => {
    test("should match the snapshot", () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
    test("should render right number of TextInput", () => {
      expect(findElements(TextInput).length).toBe(1);
    });
    test("should not render article card if isLoading true", () => {
      expect(findElements(AnimatedCard).length).toBe(0);
    });
    test("should render the right number of article card", () => {
      wrapper.setProps({
        articles: _.keyBy(articles, article => article.id),
        isLoading: false,
        authors: _.keyBy(authors, author => author.id)
      });
      expect(findElements(AnimatedCard).length).toBe(3);
      expect(findElements(AuthorCard).length).toBe(1);
    });
  });
  describe("component methods & functions", () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
      jest.spyOn(instance, "handleOnChange");
      jest.spyOn(instance, "handleEnterPress");
    });
    afterEach(() => {
      instance.handleOnChange.mockClear();
      instance.handleEnterPress.mockClear();
    });

    test("should respond on change input text", () => {
      const value = "hello_world";
      findElements(TextInput)
        .at(0)
        .simulate("change", {
          target: {
            value
          }
        });
      expect(instance.handleOnChange).toHaveBeenCalledWith(value);
      expect(handleInputChange).toHaveBeenCalledWith(value);
    });
    test("should response on ENTER key press", () => {
      const searchQuery = "hello_world";
      findElements(TextInput)
        .at(0)
        .simulate("keydown", { keyCode: 13, shiftKey: false });
      expect(instance.handleEnterPress).toHaveBeenCalledWith({
        keyCode: 13,
        shiftKey: false
      });
      expect(fetchResults).toHaveBeenCalledWith(searchQuery, 1, props.history);
      expect(instance.searchArticle).toHaveBeenCalledWith(props.searchQuery);
    });
    test("should filter article by tags", () => {
      wrapper.setProps({
        articles: _.keyBy(articles, "id")
      });
      wrapper
        .find(`[data-test="single-tag"]`)
        .at(0)
        .simulate("click");
      expect(wrapper.state().activeTag).toEqual(0);
      expect(instance.handleTagFilter).toHaveBeenCalledWith(
        wrapper.state().tagsList[0],
        0
      );
    });
    describe("Component life cycle metho", () => {
      const component = mount(<SearchResults {...props} />);
      test("should fetch article and set search query", () => {
        expect(fetchResults).toHaveBeenCalled();
        expect(handleInputChange).toBeCalled();
      });
      test("should clear test result on component unmount", () => {
        component.unmount();
        expect(clearSearchResults).toBeCalled();
      });
    });
  });
});
