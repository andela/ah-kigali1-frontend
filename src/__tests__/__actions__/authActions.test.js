import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "../../utils/axios";
import reduxStore from "../../redux/store";
import {
  handleSignIn,
  handleTextInput,
  socialAuth
} from "../../redux/actions/authActions";
import {
  SUBMITTING_LOGIN_CREDENTIALS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_INPUT_CHANGE,
  IS_OPENING_SOCIAL_AUTH_PROVIDER,
  CANCEL_SOCIAL_AUTH,
  SET_CURRENT_USER
} from "../../redux/actionTypes";

const API_BASE_URL = "http://localhost:3000/api/v1";
let data;
const mockStore = configureMockStore([thunk]);
let store;

describe("Login action creators", () => {
  describe("handle user input action creator", () => {
    data = { name: "email", value: "me@example.com" };
    it("should create an action to update text input value", () => {
      const expectedAction = {
        type: LOGIN_INPUT_CHANGE,
        payload: data
      };
      expect(handleTextInput(data.name, data.value)).toEqual(expectedAction);
    });
  });

  describe("handle sign action creator", () => {
    beforeEach(() => {
      moxios.install(axios);
      store = mockStore({});
    });
    afterEach(() => {
      moxios.uninstall(axios);
    });
    it("dispatches LOGIN_SUCCESS after successfully signing in", () => {
      store = mockStore({ login: reduxStore.login });
      data = { name: "email", value: "me@example.com" };
      const payload = {
        message: "Sign in failed",
        token: "qwertyuiop123456789"
      };
      const expectedActions = [
        {
          type: SUBMITTING_LOGIN_CREDENTIALS
        },
        {
          type: LOGIN_SUCCESS,
          payload: { ...payload }
        },
        {
          type: SET_CURRENT_USER,
          payload: null
        }
      ];

      moxios.stubRequest(`${API_BASE_URL}/users/login`, {
        status: 201,
        response: {
          ...payload
        }
      });
      return store.dispatch(handleSignIn({ ...data })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it("dispatches LOGIN_FAILED after providing invalid credentials", () => {
      store = mockStore({ login: reduxStore.login });
      const payload = { message: "Sign in failed", errors: {} };
      const expectedActions = [
        {
          type: SUBMITTING_LOGIN_CREDENTIALS
        },
        {
          type: LOGIN_FAILED,
          payload: { ...payload }
        }
      ];

      moxios.stubRequest(`${API_BASE_URL}/users/login`, {
        status: 400,
        response: {
          ...payload
        }
      });

      return store.dispatch(handleSignIn({ ...data })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it("dispatches IS_OPENING_SOCIAL_AUTH_PROVIDER action creator", () => {
      global.open = jest.fn();
      const expectedAction = [
        {
          type: IS_OPENING_SOCIAL_AUTH_PROVIDER
        }
      ];
      return store.dispatch(socialAuth("something")).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });

    it("dispatches CANCEL_SOCIAL_AUTH action creator", () => {
      /* eslint no-throw-literal: "off" */
      global.open = jest.fn(() => {
        throw "error";
      });
      const expectedAction = [
        {
          type: IS_OPENING_SOCIAL_AUTH_PROVIDER
        },
        {
          type: CANCEL_SOCIAL_AUTH
        }
      ];
      return store.dispatch(socialAuth("something")).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
