import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "../../utils/axios";
import {
  fetchingArticle,
  fetchArticle,
  deleteArticle
} from "../../redux/actions/readArticleActionCreator";
import {
  FETCHING_ARTICLE,
  FETCHING_ASIDE_ARTICLES,
  ARTICLE_FETCHED,
  ARTICLE_ERROR,
  DELETE_ARTICLE
} from "../../redux/actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const BASE_URL = process.env.API_BASE_URL;
describe("fetching article", () => {
  test("should return fetching article action", () => {
    expect(fetchingArticle()).toEqual({ type: FETCHING_ARTICLE });
  });
});

describe("Fetching and deleting an article ", () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should dispatch the create article action", async () => {
    const store = mockStore({});
    const actions = [
      {
        type: ARTICLE_FETCHED,
        payload: {
          message: "Article fetched"
        }
      },
      {
        type: FETCHING_ASIDE_ARTICLES,
        payload: {
          articles: [""]
        }
      }
    ];
    await moxios.stubRequest(`${BASE_URL}/articles/helloWorld`, {
      status: 200,
      response: {
        message: "Article fetched"
      }
    });
    await moxios.stubRequest(`${BASE_URL}/articles?limit=7`, {
      status: 200,
      response: {
        articles: [""]
      }
    });
    store.dispatch(fetchArticle("helloWorld")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should dispatch the fetch article error", async () => {
    const store = mockStore({});
    const actions = [
      {
        type: ARTICLE_ERROR,
        payload: {
          message: "Error is thrown"
        }
      }
    ];
    await moxios.stubRequest(`${BASE_URL}/articles/helloWorld`, {
      status: 404,
      response: {
        message: "Error is thrown"
      }
    });
    store.dispatch(fetchArticle("helloWorld")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should dispatch the delete article method", async () => {
    const store = mockStore({});
    const actions = [
      {
        type: DELETE_ARTICLE,
        payload: {
          message: "Article deleted successfully"
        }
      }
    ];
    await moxios.stubRequest(`${BASE_URL}/articles/helloWorld`, {
      status: 200,
      response: {
        message: "Article deleted successfully"
      }
    });
    store.dispatch(deleteArticle("helloWorld")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should dispatch the delete article error", async () => {
    const store = mockStore({});
    const actions = [
      {
        type: DELETE_ARTICLE,
        payload: {
          message: "Error is thrown"
        }
      }
    ];
    await moxios.stubRequest(`${BASE_URL}/articles/helloWorld`, {
      status: 404,
      response: {
        message: "Error is thrown"
      }
    });
    store.dispatch(deleteArticle("helloWorld")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });
});
