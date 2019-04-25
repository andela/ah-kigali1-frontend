import configureMockStore from "redux-mock-store";
import moaxios from "moxios";
import thunk from "redux-thunk";
import dotenv from "dotenv";
import * as actions from "../../redux/actions/socialAuthActions";
import {
  SOCIAL_AUTH_FAILED,
  SOCIAL_AUTH_SUCCESS,
  SUBMITTING_SOCIAL_AUTH,
  SET_CURRENT_USER
} from "../../redux/actionTypes";
import axios from "../../utils/axios";

dotenv.config();
const data = {
  username: "luc12",
  id: "werty27egy",
  email: "luc.bayo@gmail.com"
};
const mockStore = configureMockStore([thunk]);
describe("Social Auth action", () => {
  beforeEach(() => {
    moaxios.install(axios);
  });
  afterEach(() => {
    moaxios.uninstall(axios);
  });
  it("should set new token", () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: SUBMITTING_SOCIAL_AUTH
      },
      {
        type: SOCIAL_AUTH_SUCCESS
      },
      {
        type: SET_CURRENT_USER,
        payload: null
      }
    ];
    moaxios.stubRequest(`${process.env.API_BASE_URL}/users/current`, {
      status: 200,
      response: {
        user: { ...data }
      }
    });
    return store
      .dispatch(actions.handleUserLogin("1234567qwertyuyt"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it("should not set token", () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: SUBMITTING_SOCIAL_AUTH
      },
      {
        type: SOCIAL_AUTH_FAILED,
        payload: { message: "Login failed please try again!" }
      }
    ];
    moaxios.stubRequest(`${process.env.API_BASE_URL}/users/current`, {
      status: 401,
      response: {
        ...data
      }
    });
    return store
      .dispatch(actions.handleUserLogin("1234567qwertyuyt"))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
