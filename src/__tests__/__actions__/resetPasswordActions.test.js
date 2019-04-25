import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import dotenv from "dotenv";
import axios from "../../utils/axios";
import reduxStore from "../../redux/store";
import {
  handleInputChange,
  sendResetLink
} from "../../redux/actions/resetPasswordActions";
import {
  SENDING_RESET_PASSWORD_LINK,
  RESET_PASSWORD_INPUT_CHANGE,
  RESET_PASSWORD_LINK_SUCCESS,
  RESET_PASSWORD_LINK_FAILED
} from "../../redux/actionTypes";

dotenv.config();
let data;
const mockStore = configureMockStore([thunk]);
let store;

describe("ResetPassword action creators", () => {
  describe("handle user input action creator", () => {
    data = { name: "email", value: "me@example.com" };
    it("should create an action to update text input value", () => {
      const expectedAction = {
        type: RESET_PASSWORD_INPUT_CHANGE,
        payload: data
      };
      expect(handleInputChange(data.name, data.value)).toEqual(expectedAction);
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
    it("dispatches RESET_PASSWORD_LINK_SUCCESS after successfully sending link", () => {
      store = mockStore({ login: reduxStore.resetPassword });
      data = { name: "email", value: "me@example.com" };
      const payload = {
        message:
          "Password reset instructions have been sent to your account's primary email address."
      };
      const expectedActions = [
        {
          type: SENDING_RESET_PASSWORD_LINK
        },
        {
          type: RESET_PASSWORD_LINK_SUCCESS,
          payload: { ...payload }
        }
      ];

      moxios.stubRequest(`${process.env.API_BASE_URL}/users/reset_password`, {
        status: 200,
        response: {
          ...payload
        }
      });
      return store.dispatch(sendResetLink(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it("dispatches RESET_PASSWORD_LINK_FAILED sending reset password link failed", () => {
      store = mockStore({ login: reduxStore.login });
      const payload = { message: "User not found" };
      const expectedActions = [
        {
          type: SENDING_RESET_PASSWORD_LINK
        },
        {
          type: RESET_PASSWORD_LINK_FAILED,
          payload: { ...payload }
        }
      ];

      moxios.stubRequest(`${process.env.API_BASE_URL}/users/reset_password`, {
        status: 404,
        response: {
          ...payload
        }
      });

      return store.dispatch(sendResetLink({ ...data })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
