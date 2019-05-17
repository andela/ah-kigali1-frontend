import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "../../utils/axios";
import {
  RATING_ARTICLE,
  RATING_FAILURE,
  RATING_SUCCESS,
  RATING_FOUND
} from "../../redux/actionTypes";

import {
  rateArticle,
  ratingArticle,
  fetchRatings
} from "../../redux/actions/ratingActions";

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
let store;
const { API_URL } = process.env;
describe("Rating article actions", () => {
  beforeEach(() => {
    moxios.install(axios);
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should return rating in progress", () => {
    expect(ratingArticle()).toEqual({ type: RATING_ARTICLE });
  });

  test("should return fetchRatings action", async () => {
    const actions = [
      { type: RATING_ARTICLE },
      { type: RATING_FOUND, payload: "Ratings retrieved" }
    ];
    await moxios.stubRequest(`${API_URL}/articles/helloWorld/rating`, {
      status: 200,
      response: "Ratings retrieved"
    });
    store.dispatch(fetchRatings("helloWorld")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should return fetchRatings failure", async () => {
    const actions = [
      { type: RATING_ARTICLE },
      { type: RATING_FAILURE, payload: "Not found" }
    ];
    await moxios.stubRequest(`${API_URL}/articles/helloWorld/rating`, {
      status: 404,
      response: {
        message: "Not found"
      }
    });
    store.dispatch(fetchRatings("helloWorld")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should return article rated successfully", async () => {
    const actions = [
      { type: RATING_ARTICLE },
      { type: RATING_SUCCESS, payload: "Article rated successfully" }
    ];
    await moxios.stubRequest(`${API_URL}/articles/helloWorld/rating`, {
      status: 201,
      response: "Article rated successfully"
    });
    store.dispatch(rateArticle("helloWorld", 4)).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should return trying to rate article twice error", async () => {
    const actions = [
      { type: RATING_ARTICLE },
      { type: RATING_SUCCESS, payload: "Article rate updated successfully" }
    ];
    await moxios.stubRequest(`${API_URL}/articles/helloWorld/rating`, {
      status: 409,
      response: {
        message: "Article rated successfully"
      }
    });
    store.dispatch(rateArticle("helloWorld", 4)).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should return trying to rate non-existing article", async () => {
    const actions = [
      { type: RATING_ARTICLE },
      { type: RATING_FAILURE, payload: "Article not found" }
    ];
    await moxios.stubRequest(`${API_URL}/articles/helloWorld/rating`, {
      status: 404,
      response: {
        message: "Article not found"
      }
    });
    store.dispatch(rateArticle("helloWorld", 4)).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });
});
