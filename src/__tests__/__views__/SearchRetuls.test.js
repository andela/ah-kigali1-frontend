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
  searchQuery: "helloWorld",
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
      jest.spyOn(instance, "searchArticle");
      jest.spyOn(instance, "handleTagFilter");
    });
    afterEach(() => {
      instance.handleOnChange.mockClear();
      instance.handleEnterPress.mockClear();
      instance.searchArticle.mockClear();
    });

    test("should respond on change input text", () => {
      const value = props.searchQuery;
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
      const { searchQuery } = props;
      wrapper.setState({
        pageNumber: 1
      });
      wrapper.update();
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
    test("should clear article filtering", () => {
      wrapper.setState({
        activeTag: 0
      });
      wrapper
        .find(`[data-test="single-tag"]`)
        .at(0)
        .simulate("click");
      expect(instance.handleTagFilter).toHaveBeenCalledWith(
        wrapper.state().tagsList[0],
        0
      );
      expect(wrapper.state().articles).toEqual(_.values(articles));
      expect(wrapper.state().activeTag).toEqual(null);
    });

    describe("Component life cycle metho", () => {
      test("should fetch article and set search query", () => {
        mount(<SearchResults {...props} />);
        expect(fetchResults).toHaveBeenCalled();
        expect(fetchResults).toHaveBeenCalledWith(props.searchQuery, 1);
        expect(handleInputChange).toHaveBeenCalledWith(props.searchQuery);
      });
      test("should clear test result on component unmount", () => {
        const component = mount(<SearchResults {...props} />);
        component.unmount();
        expect(clearSearchResults).toBeCalled();
      });
      test("should set articles in state", () => {
        const component = mount(<SearchResults {...props} />);
        const transformedArticles = _.keyBy(articles, "id");
        component.setProps({
          articles: transformedArticles,
          authors
        });
        expect(component.state().articles).toEqual(
          _.values(transformedArticles)
        );
      });
    });
  });
});
