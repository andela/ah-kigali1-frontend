/* eslint-disable no-useless-escape */
import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "../../utils/axios";
import reduxStore from "../../redux/store";
import {
  handleLike,
  handleDislike,
  likeSubmitted,
  likeFailed,
  likeSucceed,
  dislikeSucceed
} from "../../redux/actions/likeActions";
import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  REQUEST_SUBMITTED,
  REQUEST_FAILED
} from "../../redux/actionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("test login action", () => {
  it("should call submit acion ", () => {
    const expectedAction = {
      type: REQUEST_SUBMITTED
    };
    expect(likeSubmitted()).toEqual(expectedAction);
  });

  it("should call submit acion ", () => {
    const expectedAction = {
      type: REQUEST_SUBMITTED
    };
    expect(likeSubmitted()).toEqual(expectedAction);
  });

  it("should call like success action ", () => {
    const expectedAction = {
      type: LIKE_ARTICLE,
      payload: "you have like this article"
    };
    expect(likeSucceed("you have like this article")).toEqual(expectedAction);
  });

  it("should call dislike success action ", () => {
    const expectedAction = {
      type: DISLIKE_ARTICLE,
      payload: "you have dislike this article"
    };
    expect(dislikeSucceed("you have dislike this article")).toEqual(
      expectedAction
    );
  });

  it("should call like failed action ", () => {
    const expectedAction = {
      type: REQUEST_FAILED,
      payload: "request failed"
    };
    expect(likeFailed("request failed")).toEqual(expectedAction);
  });
});

describe.only("should called like actions creators", () => {
  const articleSlug = "a-fake-slug";
  const urlRegex = /^https:\/\/titan-devs.herokuapp.com\/api\/v1\/articles\/.*likes$/;

  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  it("should handle like event", () => {
    const payload = "article has been liked";
    moxios.stubRequest(urlRegex, {
      status: 200,
      response: {
        message: payload
      }
    });
    const store = mockStore({ like: {} });
    const expectedActions = [
      { type: REQUEST_SUBMITTED },
      { type: LIKE_ARTICLE, payload }
    ];
    return store.dispatch(handleLike(articleSlug)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should dispatch an error when like request failed", () => {
    const payload = "An error occurs";
    moxios.stubRequest(urlRegex, {
      status: 500,
      response: {
        message: payload
      }
    });
    const store = mockStore({ like: {} });
    const expectedActions = [
      { type: REQUEST_SUBMITTED },
      { type: REQUEST_FAILED, payload }
    ];
    return store.dispatch(handleLike(articleSlug)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should handle like event", () => {
    const payload = "article has been disliked";

    moxios.stubRequest(urlRegex, {
      status: 200,
      response: {
        message: payload
      }
    });
    const store = mockStore({ like: {} });
    const expectedActions = [
      { type: REQUEST_SUBMITTED },
      { type: DISLIKE_ARTICLE, payload }
    ];
    return store.dispatch(handleDislike(articleSlug)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should dispatch an error when like request failed", () => {
    const payload = "An error occurs";
    moxios.stubRequest(urlRegex, {
      status: 500,
      response: {
        message: payload
      }
    });
    const store = mockStore({ like: {} });
    const expectedActions = [
      { type: REQUEST_SUBMITTED },
      { type: REQUEST_FAILED, payload }
    ];
    return store.dispatch(handleDislike(articleSlug)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
