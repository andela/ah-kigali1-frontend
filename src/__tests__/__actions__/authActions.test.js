import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import dotenv from "dotenv";
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

dotenv.config();
let data;
const mockStore = configureMockStore([thunk]);
let store;
const { API_URL } = process.env;
const userProfile = {
  email: "iraguhayves@gmail.com",
  iat: 1558020564,
  id: "7ed00c09-664b-414f-8896-80c4f4d4630b",
  roleId: "d81bedff-958a-4dd8-8c05-bc4684a38374",
  username: "yves2018"
};
describe("Login action creators", () => {
  describe("handle user input action creator", () => {
    data = { name: "email", value: "me@example.com" };
    test("should create an action to update text input value", () => {
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

    test("dispatches LOGIN_SUCCESS after successfully signing in", () => {
      store = mockStore({ login: reduxStore.login });
      data = { name: "email", value: "me@example.com" };
      const payload = {
        message: "Sign in failed",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWd1aGF5dmVzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoieXZlczIwMTgiLCJpZCI6IjdlZDAwYzA5LTY2NGItNDE0Zi04ODk2LTgwYzRmNGQ0NjMwYiIsInJvbGVJZCI6ImQ4MWJlZGZmLTk1OGEtNGRkOC04YzA1LWJjNDY4NGEzODM3NCIsImlhdCI6MTU1ODAyMDU2NH0.Ky17ZyGMtnoj-8X3ZkXOmMZ7K671EG7WZD2UIHmkBRA"
      };
      const expectedActions = [
        {
          type: SUBMITTING_LOGIN_CREDENTIALS
        },
        {
          type: LOGIN_SUCCESS,
          payload
        },
        {
          type: SET_CURRENT_USER,
          payload: userProfile
        }
      ];
      moxios.stubRequest(`${API_URL}/users/login`, {
        status: 201,
        response: {
          ...payload
        }
      });
      return store.dispatch(handleSignIn({ ...data })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("dispatches LOGIN_FAILED after providing invalid credentials", () => {
      store = mockStore({ login: reduxStore.login });
      const payload = { message: "Sign in failed", errors: {} };
      const expectedActions = [
        {
          type: SUBMITTING_LOGIN_CREDENTIALS
        },
        {
          type: LOGIN_FAILED,
          payload
        }
      ];
      moxios.stubRequest(`${API_URL}/users/login`, {
        status: 400,
        response: payload
      });
      return store.dispatch(handleSignIn({ ...data })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("dispatches IS_OPENING_SOCIAL_AUTH_PROVIDER action creator", () => {
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

    test("dispatches CANCEL_SOCIAL_AUTH action creator", () => {
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
