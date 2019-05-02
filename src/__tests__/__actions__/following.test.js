import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "../../utils/axios";

import { followUser } from "../../redux/actions/followingActions";
import {
  FOLLOWING_FAILED,
  FOLLOWING_SUCCESS,
  WAITING_RESPONSE
} from "../../redux/actionTypes";

const mockStore = configureMockStore([thunk]);
let store;

describe("test the following actions", () => {
  beforeEach(() => {
    moxios.install(axios);
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe("test fetch following", () => {
    const location = { pathname: "gdfjbjhgdsfj" };
    const history = { push: jest.fn() };
    test("should dispatch the success action after successfully following the user", () => {
      store = mockStore({});
      const expectedActions = [
        { type: WAITING_RESPONSE },
        { type: FOLLOWING_SUCCESS, payload: true }
      ];
      moxios.stubRequest(`${process.env.API_URL}/profiles/claude/follow`, {
        status: 201,
        response: { message: "Follow successful" }
      });
      return store
        .dispatch(followUser("claude", { location, history }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test("should dispatch the success action after successfully unfollowing the user", () => {
      store = mockStore({});
      const expectedActions = [
        { type: WAITING_RESPONSE },
        { type: FOLLOWING_SUCCESS, payload: false }
      ];
      moxios.stubRequest(`${process.env.API_URL}/profiles/claude/follow`, {
        status: 202,
        response: { message: "You have unfollowed this author" }
      });
      return store
        .dispatch(followUser("claude", { location, history }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    test("should dispatch the failed action if there was a problem while following the user", () => {
      store = mockStore({});
      const expectedActions = [
        { type: WAITING_RESPONSE },
        { type: FOLLOWING_FAILED, payload: false }
      ];
      moxios.stubRequest(`${process.env.API_URL}/profiles/claude/follow`, {
        status: 500,
        response: { message: "Error while following the user" }
      });
      return store
        .dispatch(followUser("claude", { location, history }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
