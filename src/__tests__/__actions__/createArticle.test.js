import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import dotenv from "dotenv";
import axios from "../../utils/axios";
import { article } from "../__mocks__/testData";
import {
  NEW_ARTICLE,
  ARTICLE_ERROR,
  SUBMITTING_ARTICLE,
  FETCH_ARTICLE_TO_EDIT,
  ARTICLE_UPDATED
} from "../../redux/actionTypes";

import {
  newArticle,
  editArticle,
  articleUpdated,
  fetchOneArticle
} from "../../redux/actions/newArticle";

dotenv.config();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const { API_URL } = process.env;
describe("async action creator ", () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should dispatch the create article action", async () => {
    const store = mockStore({});
    const actions = [
      { type: SUBMITTING_ARTICLE },
      {
        type: NEW_ARTICLE,
        payload: {
          message: "Article Created",
          article: {
            slug: "helloWorld"
          }
        }
      }
    ];
    await moxios.stubRequest(`${API_URL}/articles`, {
      status: 201,
      response: {
        message: "Article Created",
        article: {
          slug: "helloWorld"
        }
      }
    });
    store.dispatch(newArticle(article, { push: jest.fn() })).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should dispatch the auth_error action", async () => {
    const store = mockStore({});
    const actions = [
      { type: SUBMITTING_ARTICLE },
      {
        type: ARTICLE_ERROR,
        payload: "Sorry, we are unable to authenticate you"
      }
    ];
    await moxios.stubRequest(`${API_URL}/articles`, {
      status: 401,
      response: {
        message: "Sorry, we are unable to authenticate you"
      }
    });
    store.dispatch(newArticle(article)).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });
});

describe("Edit article", () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should return article updated action", () => {
    expect(articleUpdated({ data: "article updated" })).toEqual({
      type: ARTICLE_UPDATED,
      payload: "article updated"
    });
  });

  test("should dispatch the edit article action", async () => {
    const store = mockStore({});
    const actions = [
      { type: SUBMITTING_ARTICLE },
      {
        type: ARTICLE_UPDATED,
        payload: {
          message: "Article updated",
          article: {
            slug: "helloWorld"
          }
        }
      }
    ];
    await moxios.stubRequest(`${API_URL}/articles/hello-world`, {
      status: 201,
      response: {
        message: "Article updated",
        article: {
          slug: "helloWorld"
        }
      }
    });
    store
      .dispatch(editArticle(article, "hello-world", { push: jest.fn() }))
      .then(() => {
        expect(store.getActions()).toEqual(actions);
      });
  });

  test("should dispatch article error, in edit article", async () => {
    const store = mockStore({});
    const actions = [
      { type: SUBMITTING_ARTICLE },
      {
        type: ARTICLE_ERROR,
        payload: "Sorry, we are unable to authenticate you"
      }
    ];
    await moxios.stubRequest(`${API_URL}/articles/hello-world`, {
      status: 401,
      response: {
        message: "Sorry, we are unable to authenticate you"
      }
    });
    store.dispatch(editArticle(article, "hello-world")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should dispatch fetch article to edit action", async () => {
    const store = mockStore({});
    const actions = [
      {
        type: FETCH_ARTICLE_TO_EDIT,
        payload: {
          message: "Article retrieved"
        }
      }
    ];
    await moxios.stubRequest(`${API_URL}/articles/hell-world`, {
      status: 200,
      response: {
        message: "Article retrieved"
      }
    });
    store.dispatch(fetchOneArticle("hell-world")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });

  test("should dispatch fetch article to edit error", async () => {
    const store = mockStore({});
    const actions = [
      {
        type: ARTICLE_ERROR,
        payload: "No article with that slug"
      }
    ];
    await moxios.stubRequest(`${API_URL}/articles/hello-world`, {
      status: 404,
      response: {
        message: "No article with that slug"
      }
    });
    store.dispatch(fetchOneArticle("hello-world")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });
});
