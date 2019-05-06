import thunk from "redux-thunk";
import storeConfig from "redux-mock-store";
import moxios from "moxios";
import dotenv from "dotenv";
import axios from "../../utils/axios";
import * as actions from "../../redux/actions/searchActions";
import { articles, authors } from "../__mocks__/testData";
import {
  SEARCHING_ARTICLES,
  SEARCH_QUERY_CHANGE,
  ARTICLE_SEARCH_FAILED,
  ARTICLE_SEARCH_SUCCESS,
  CLEAR_SEARCH_RESULTS,
  SET_SUGGESTED_ARTICLES
} from "../../redux/actionTypes";
import { arrayToObject } from "../../utils/helperFunctions";

const keyword = "hello_world";
dotenv.config();
const mockStore = storeConfig([thunk]);
let store;

const history = {
  push: jest.fn()
};

describe("Search Action Creators", () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
    history.push.mockClear();
  });

  test("should create SEARCH_QUERY_CHANGE", () => {
    const value = "hello_search";
    const expectedActions = {
      type: SEARCH_QUERY_CHANGE,
      payload: value
    };
    expect(actions.handleInputChange(value)).toEqual(expectedActions);
  });

  test("should dispatch ARTICLE_SEARCH_SUCCESS", () => {
    const expectedActions = [
      {
        type: SEARCHING_ARTICLES
      },
      {
        type: CLEAR_SEARCH_RESULTS
      },
      {
        type: ARTICLE_SEARCH_SUCCESS,
        payload: {
          articles: { ...arrayToObject(articles, "id") },
          authors: { ...authors }
        }
      }
    ];
    moxios.stubRequest(
      `${process.env.API_BASE_URL}/articles?keyword=${keyword}&page=${1}`,
      {
        status: 200,
        response: {
          articles
        }
      }
    );
    store = mockStore({});
    return store
      .dispatch(actions.fetchResults(keyword, 1, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(history.push).toHaveBeenCalledWith(`/search?keyword=${keyword}`);
      });
  });

  test("should dispatch ARTICLE_SEARCH_FAILED action creator", () => {
    const pageNumber = 2;
    const expectedActions = [
      {
        type: SEARCHING_ARTICLES
      },
      {
        type: ARTICLE_SEARCH_FAILED,
        payload: {
          message: "Unauthorized"
        }
      }
    ];
    moxios.stubRequest(
      `${process.env.API_BASE_URL}${actions.searchURL(keyword, pageNumber)}`,
      {
        status: 401,
        response: {
          message: "Unauthorized"
        }
      }
    );
    store = mockStore({});
    return store
      .dispatch(actions.fetchResults(keyword, pageNumber, history))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(history.push.mock.calls.length).toBe(0);
      });
  });

  test("should dispatch SET_SUGGESTED_ARTICLES", () => {
    const query = "hello world";
    const expectedActions = [
      {
        type: SEARCH_QUERY_CHANGE,
        payload: query
      },
      {
        type: SET_SUGGESTED_ARTICLES,
        payload: { articles: { ...arrayToObject(articles, "id") } }
      }
    ];
    moxios.stubRequest(
      `${process.env.API_BASE_URL}${actions.searchURL(query)}&limit=${4}`,
      {
        status: 200,
        response: {
          articles
        }
      }
    );
    store = mockStore({});
    return store.dispatch(actions.authSuggestArticles(query)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("should dispatch ARTICLE_SEARCH_FAILED ", () => {
    const query = "hello world";
    const payload = { message: "Unknown error occurred" };
    const expectedActions = [
      {
        type: SEARCH_QUERY_CHANGE,
        payload: query
      },
      {
        type: ARTICLE_SEARCH_FAILED,
        payload
      }
    ];
    moxios.stubRequest(
      `${process.env.API_BASE_URL}${actions.searchURL(query)}&limit=${4}`,
      {
        status: 500,
        response: {
          ...payload
        }
      }
    );
    store = mockStore({});
    return store.dispatch(actions.authSuggestArticles(query)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
