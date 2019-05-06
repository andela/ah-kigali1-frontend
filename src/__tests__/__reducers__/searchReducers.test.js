import {
  SEARCHING_ARTICLES,
  SEARCH_QUERY_CHANGE,
  ARTICLE_SEARCH_FAILED,
  ARTICLE_SEARCH_SUCCESS,
  SET_SUGGESTED_ARTICLES,
  CLEAR_SEARCH_RESULTS
} from "../../redux/actionTypes";
import searchReducers from "../../redux/reducers/searchReducers";
import { articles, authors } from "../__mocks__/testData";
import { arrayToObject } from "../../utils/helperFunctions";

const INITIAL_STATE = {
  searchQuery: "",
  articles: {},
  authors: {},
  errors: {},
  isLoading: true,
  suggestedArticles: {}
};

describe("Search Action Reducers", () => {
  test("should should match the initial state", () => {
    expect(searchReducers(undefined, {})).toEqual({ ...INITIAL_STATE });
  });
  test("should update the searchQuery", () => {
    const value = "hello_world";
    expect(
      searchReducers(INITIAL_STATE, {
        type: SEARCH_QUERY_CHANGE,
        payload: value
      })
    ).toEqual({ ...INITIAL_STATE, searchQuery: value });
  });

  test("should update isLoading", () => {
    expect(
      searchReducers(INITIAL_STATE, {
        type: SEARCHING_ARTICLES
      })
    ).toEqual({ ...INITIAL_STATE, isLoading: true });
  });

  test("should update article and authors", () => {
    expect(
      searchReducers(INITIAL_STATE, {
        type: ARTICLE_SEARCH_SUCCESS,
        payload: {
          articles: { ...arrayToObject(articles) },
          authors: { ...authors }
        }
      })
    ).toEqual({
      ...INITIAL_STATE,
      isLoading: false,
      articles: { ...INITIAL_STATE.articles, ...arrayToObject(articles) },
      authors: { ...INITIAL_STATE.authors, ...authors }
    });
  });

  test("should update error and error message", () => {
    const payload = { message: "Unauthorized", errors: {} };
    expect(
      searchReducers(INITIAL_STATE, {
        type: ARTICLE_SEARCH_FAILED,
        payload
      })
    ).toEqual({
      ...INITIAL_STATE,
      isLoading: false,
      errors: { message: payload.message, ...payload.errors }
    });
  });

  test("should set suggested articles", () => {
    const payload = { articles: { ...arrayToObject(articles) } };
    expect(
      searchReducers(INITIAL_STATE, {
        type: SET_SUGGESTED_ARTICLES,
        payload: { ...payload }
      })
    ).toEqual({ ...INITIAL_STATE, suggestedArticles: { ...payload.articles } });
  });

  test("should clear all search related data", () => {
    expect(
      searchReducers(INITIAL_STATE, {
        type: CLEAR_SEARCH_RESULTS
      })
    ).toEqual({ ...INITIAL_STATE, isLoading: false });
  });
});
