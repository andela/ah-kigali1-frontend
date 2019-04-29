import React from "react";
import toJson from "enzyme-to-json";
<<<<<<< HEAD
import { shallow, mount } from "enzyme";
import { SearchResults } from "../../views/SearchResults";
import { AnimatedCard } from "../../components/common/Cards/AnimatedCard";
import TextInput from "../../components/common/Inputs/TextInput";
import { articles, authors } from "../__mocks__/testData";
import AuthorCard from "../../components/common/Cards/AuthorCard";
import { arrayToObject } from "../../utils/helperFunctions";

const articlesObj = arrayToObject(articles, "id");
const authorObj = arrayToObject(authors, "id");
const [handleInputChange, fetchResults, clearSearchResults, push] = new Array(
  4
).fill(jest.fn());

=======
import _ from "lodash";
import { shallow, mount } from "enzyme";
import { SearchResults } from "../../views/SearchResults";
import AnimatedCard from "../../components/common/Cards/AnimatedCard";
import TextInput from "../../components/common/Inputs/TextInput";
import { articles, authors } from "../testData";
import AuthorCard from "../../components/common/Cards/AuthorCard";

const [handleInputChange, fetchResults, clearSearchResults] = new Array(3).fill(
  jest.fn()
);
>>>>>>> [Feature #163518658] clear search results on component will unmount
const props = {
  handleInputChange,
  fetchResults,
  clearSearchResults,
<<<<<<< HEAD
  searchQuery: "helloWorld",
  articles: {},
  authors: {},
  history: {
    location: {
      search: "?keyword=helloWorld"
    },
    push
=======
  searchQuery: "hello_world",
  articles: {},
  authors: {},
  location: {
    search: "/?keyword=helloWorld"
>>>>>>> [Feature #163518658] clear search results on component will unmount
  },
  isLoading: true,
  errors: {}
};
<<<<<<< HEAD

const wrapper = shallow(<SearchResults {...props} />);
const findElements = element => wrapper.find(element);

describe("Search Results Component", () => {
  afterEach(() => {
    wrapper.setProps({
      ...props
    });
    handleInputChange.mockClear();
    fetchResults.mockClear();
  });

=======
const wrapper = shallow(<SearchResults {...props} />);
const findElements = element => wrapper.find(element);
describe("Search Results Component", () => {
  afterEach(() => {
    handleInputChange.mockClear();
    fetchResults.mockClear();
  });
>>>>>>> [Feature #163518658] clear search results on component will unmount
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
<<<<<<< HEAD
        articles: { ...articlesObj },
        authors: { ...authorObj }
=======
        articles: _.keyBy(articles, article => article.id),
        isLoading: false,
        authors: _.keyBy(authors, author => author.id)
>>>>>>> [Feature #163518658] clear search results on component will unmount
      });
      expect(findElements(AnimatedCard).length).toBe(3);
      expect(findElements(AuthorCard).length).toBe(1);
    });
  });
<<<<<<< HEAD

=======
>>>>>>> [Feature #163518658] clear search results on component will unmount
  describe("component methods & functions", () => {
    let instance;
    beforeEach(() => {
      instance = wrapper.instance();
<<<<<<< HEAD
      [
        "handleOnChange",
        "handleEnterPress",
        "searchArticle",
        "handleTagFilter"
      ].forEach(method => jest.spyOn(instance, method));
      wrapper.setProps({
        articles: { ...articlesObj },
        authors: { ...authorObj },
        isLoading: false
      });
    });

    afterEach(() => {
      instance.handleOnChange.mockClear();
      instance.handleEnterPress.mockClear();
      instance.searchArticle.mockClear();
      instance.handleTagFilter.mockClear();
      wrapper.setProps({
        ...props
      });
    });

    test("should respond on change input text", () => {
      const value = props.searchQuery;
=======
      jest.spyOn(instance, "handleOnChange");
      jest.spyOn(instance, "handleEnterPress");
    });
    afterEach(() => {
      instance.handleOnChange.mockClear();
      instance.handleEnterPress.mockClear();
    });
    test("should respond on change input text", () => {
      const value = "hello_world";
>>>>>>> [Feature #163518658] clear search results on component will unmount
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
<<<<<<< HEAD

    test("should response on ENTER key press", () => {
      const { searchQuery } = props;
      wrapper.setState({
        pageNumber: 1
      });
      findElements(TextInput)
        .at(0)
        .simulate("keydown", { keyCode: 13, shiftKey: false });
      expect(instance.handleEnterPress).toHaveBeenCalledWith({
        keyCode: 13,
        shiftKey: false
      });
      expect(fetchResults).toHaveBeenCalledWith(searchQuery, 1, props.history);
      expect(wrapper.state().pageNumber).toBe(1);
      expect(instance.searchArticle).toHaveBeenCalledWith(props.searchQuery);
    });
    test("should response on ENTER key press", () => {
      const { searchQuery } = props;
      wrapper.setState({
        pageNumber: 1
      });
      findElements(TextInput)
        .at(0)
        .simulate("keydown", { keyCode: 45, shiftKey: true });
      expect(instance.handleEnterPress).not.toHaveBeenCalledWith({
        keyCode: 13,
        shiftKey: false
      });
      expect(fetchResults).not.toHaveBeenCalledWith(
        searchQuery,
        1,
        props.history
      );
      expect(wrapper.state().pageNumber).toBe(1);
      expect(instance.searchArticle).not.toHaveBeenCalledWith(
        props.searchQuery
      );
    });
    test("should not respond  on ENTER key press", () => {
      wrapper.setProps({
        isLoading: true
      });
=======
    test("should response on ENTER key press", () => {
      const searchQuery = "hello_world";
>>>>>>> [Feature #163518658] clear search results on component will unmount
      findElements(TextInput)
        .at(0)
        .simulate("keydown", { keyCode: 13, shiftKey: false });
      expect(instance.handleEnterPress).toHaveBeenCalledWith({
        keyCode: 13,
        shiftKey: false
      });
<<<<<<< HEAD
      expect(fetchResults).not.toBeCalled();
      expect(instance.searchArticle).not.toHaveBeenCalledWith(
        props.searchQuery
      );
    });

    test("should filter article by tags", () => {
      wrapper.setProps({
        articles: arrayToObject(articles, "id"),
        isLoading: false
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
      expect(wrapper.state().articles).toEqual(articlesObj);
      expect(wrapper.state().activeTag).toEqual(null);
    });
    test("should render fetch error message", () => {
      wrapper.setProps({
        errors: {
          message: "No more article found"
        }
      });
      expect(wrapper.find(`[data-test="error-message"]`).text()).toEqual(
        "No more article found"
      );
    });
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
      const component = shallow(<SearchResults {...props} />);
      component.setProps({
        articles: articlesObj,
        authors: authorObj
      });
      expect(component.state().articles).toEqual(articlesObj);
      expect(component.state().authors).toEqual(authorObj);
    });
  });

  describe("Component window event", () => {
    const map = {};
    let component;
    let instance;
    beforeEach(() => {
      document.addEventListener = jest.fn((event, cb) => {
        map[event] = cb;
      });
      component = shallow(<SearchResults {...props} />);
      instance = component.instance();
      jest.spyOn(instance, "handleScroll");
      jest.spyOn(instance, "searchArticle");
    });

    afterEach(() => {
      instance.handleScroll.mockClear();
      instance.searchArticle.mockClear();
    });

    test("should respond on window scroll, but not fetch articles", () => {
      const { pageNumber } = component.state();
      map.scroll();
      expect(instance.handleScroll).toBeCalled();
      expect(component.state().pageNumber).toEqual(pageNumber);
      expect(instance.searchArticle).not.toBeCalled();
    });

    test("should fetch more article on scroll bottom", () => {
      const { pageNumber } = component.state();
      component.setProps({
        isLoading: false
      });
      window.innerHeight = 0;
      map.scroll();
      expect(instance.handleScroll).toBeCalled();
      expect(component.state().pageNumber).toEqual(pageNumber + 1);
      expect(instance.searchArticle.mock.calls.length).toBe(1);
      expect(instance.searchArticle).toHaveBeenCalledWith(props.searchQuery);
      expect(fetchResults).toHaveBeenCalledWith(
        props.searchQuery,
        pageNumber + 1,
        props.history
      );
=======
      expect(fetchResults).toHaveBeenCalledWith(searchQuery, 1);
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
>>>>>>> [Feature #163518658] clear search results on component will unmount
    });
  });
});
