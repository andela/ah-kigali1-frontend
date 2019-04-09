import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "../../utils/axios";
import { article } from "../__mocks__/testData";
import {
  INPUT_CHANGE,
  NEW_ARTICLE,
  ARTICLE_ERROR,
  SUBMITTING_ARTICLE,
  FETCH_ARTICLE_TO_EDIT,
  ARTICLE_UPDATED,
  REMOVE_TAG,
  NEW_TAG
} from "../../redux/actionTypes";

import {
  handleInputField,
  newArticle,
  removeTag,
  handleCreateTag,
  editArticle,
  articleUpdated,
  fetchOneArticle
} from "../../redux/actions/newArticle";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const BASE_URL = "http://localhost:3000/api/v1";
describe("article action creators", () => {
  test("should return the on input change action", () => {
    const data = {
      name: "body",
      value: "Hello world"
    };
    expect(handleInputField(data)).toEqual({
      type: INPUT_CHANGE,
      payload: { field: "body", value: "Hello world" }
    });
  });
  test("should return the remove tag action", () => {
    const tag = "Hello world";

    expect(removeTag(tag)).toEqual({
      type: REMOVE_TAG,
      payload: tag
    });
  });
  test("should return the add tag tag action", () => {
    const data = {
      tag: "Hello world"
    };
    expect(handleCreateTag(data)).toEqual({
      type: NEW_TAG,
      payload: "Hello world"
    });
  });
});

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
          message: "Article Created"
        }
      }
    ];
    await moxios.stubRequest(`${BASE_URL}/articles`, {
      status: 201,
      response: {
        message: "Article Created"
      }
    });
    store.dispatch(newArticle(article)).then(() => {
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
    await moxios.stubRequest(`${BASE_URL}/articles`, {
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
          message: "Article updated"
        }
      }
    ];
    await moxios.stubRequest(`${BASE_URL}/articles/hello-world`, {
      status: 201,
      response: {
        message: "Article updated"
      }
    });
    store.dispatch(editArticle(article, "hello-world")).then(() => {
      expect(store.getActions()).toEqual(actions);
    });
  });
  test("should dispatch article, in edit article", async () => {
    const store = mockStore({});
    const actions = [
      { type: SUBMITTING_ARTICLE },
      {
        type: ARTICLE_ERROR,
        payload: "Sorry, we are unable to authenticate you"
      }
    ];
    await moxios.stubRequest(`${BASE_URL}/articles/hello-world`, {
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
    await moxios.stubRequest(`${BASE_URL}/articles/hell-world`, {
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
    await moxios.stubRequest(`${BASE_URL}/articles/hello-world`, {
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
