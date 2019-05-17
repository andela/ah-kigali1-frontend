/* eslint-disable no-useless-escape */
import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "../../utils/axios";
import {
  handleBookmark,
  bookmarkFailed,
  bookmarkSubmitted,
  bookmarkSucceed
} from "../../redux/actions/bookmarkActions";
import {
  BOOKMARK_ARTICLE,
  REQUEST_SUBMITTED,
  REQUEST_FAILED
} from "../../redux/actionTypes";
import reduxStore from "../../redux/store";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("test login action", () => {
  const payload = {
    message: "you have bookmarked this article",
    isBookmarked: true,
    articleSlug: "a-fake-slug"
  };

  test("should call submit acion ", () => {
    const expectedAction = {
      type: REQUEST_SUBMITTED
    };
    expect(bookmarkSubmitted()).toEqual(expectedAction);
  });

  test("should call like success action ", () => {
    const expectedAction = {
      type: BOOKMARK_ARTICLE,
      payload
    };
    expect(
      bookmarkSucceed("you have bookmarked this article", "a-fake-slug", true)
    ).toEqual(expectedAction);
  });

  test("should call like failed action ", () => {
    const expectedAction = {
      type: REQUEST_FAILED,
      payload: "request failed"
    };
    expect(bookmarkFailed("request failed")).toEqual(expectedAction);
  });
});

describe("should called like actions creators", () => {
  const articleSlug = "a-fake-slug";
  const BOOKMARK_URL = `${
    process.env.API_URL
  }/articles/${articleSlug}/bookmark`;

  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("should handle bookmark event", () => {
    const payload = {
      message: "you have bookmarked this article",
      isBookmarked: true,
      articleSlug: "a-fake-slug"
    };
    moxios.stubRequest(BOOKMARK_URL, {
      status: 200,
      response: {
        message: payload.message
      }
    });
    const store = mockStore({ bookmark: reduxStore.bookmark });
    const expectedActions = [
      { type: REQUEST_SUBMITTED },
      { type: BOOKMARK_ARTICLE, payload }
    ];
    return store
      .dispatch(
        handleBookmark(articleSlug, false, {
          location: { pathname: "/next/test/url" },
          history: []
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should dispatch an error when like request failed", () => {
    const payload = "An error occurs";
    moxios.stubRequest(BOOKMARK_URL, {
      status: 500,
      response: {
        message: payload
      }
    });
    const store = mockStore({ bookmark: reduxStore.bookmark });
    const expectedActions = [
      { type: REQUEST_SUBMITTED },
      { type: REQUEST_FAILED, payload }
    ];
    return store
      .dispatch(
        handleBookmark(articleSlug, false, {
          location: { pathname: "/next/test/url" },
          history: []
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
