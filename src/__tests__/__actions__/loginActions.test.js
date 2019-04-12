import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "../../utils/axios";
import reduxStore from "../../redux/store";
import {
  handleSignIn,
  handleTextInput
} from "../../redux/actions/loginActions";
import {
  SUBMITTING_LOGIN_CREDENTIALS,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_INPUT_CHANGE
} from "../../redux/actionTypes";

const DEV_BASE_URL = "http://localhost:3000/api/v1";
let data;
const mockStore = configureMockStore([thunk]);
let store;

describe("Login action creators", () => {
  describe("handle user input action creator", () => {
    data = { name: "email", value: "luc.bayo@gmail.com" };
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
      data = { name: "email", value: "luc.bayo@gmail.com" };
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
        }
      ];

      moxios.stubRequest(`${DEV_BASE_URL}/users/login`, {
        status: 201,
        response: {
          ...payload
        }
      });
      return store.dispatch(handleSignIn(data)).then(() => {
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

      moxios.stubRequest(`${DEV_BASE_URL}/users/login`, {
        status: 400,
        response: {
          ...payload
        }
      });

      return store.dispatch(handleSignIn({ ...data })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
