import configureMockStore from "redux-mock-store";
import moaxios from "moxios";
import thunk from "redux-thunk";
import dotenv from "dotenv";
import * as actions from "../../redux/actions/socialAuthActions";
import {
  SOCIAL_AUTH_FAILED,
  SOCIAL_AUTH_SUCCESS,
  SUBMITTING_SOCIAL_AUTH,
  SET_CURRENT_USER,
  SET_PROFILE
} from "../../redux/actionTypes";
import axios from "../../utils/axios";

dotenv.config();
const data = {
  username: "luc12",
  id: "werty27egy",
  email: "luc.bayo@gmail.com"
};
const userProfile = {
  email: "iraguhayves@gmail.com",
  iat: 1558020564,
  id: "7ed00c09-664b-414f-8896-80c4f4d4630b",
  roleId: "d81bedff-958a-4dd8-8c05-bc4684a38374",
  username: "yves2018"
};
const { API_URL } = process.env;

const mockStore = configureMockStore([thunk]);
describe("Social Auth action", () => {
  beforeEach(() => {
    moaxios.install(axios);
  });
  afterEach(() => {
    moaxios.uninstall(axios);
  });
  test("should set new token", () => {
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
        payload: userProfile
      },
      {
        payload: {
          ...userProfile
        },
        type: SET_PROFILE
      }
    ];
    moaxios.stubRequest(`${API_URL}/users/current`, {
      status: 200,
      response: {
        user: { ...userProfile }
      }
    });
    moaxios.stubRequest(`${API_URL}/profiles/${userProfile.username}`, {
      status: 200,
      response: {
        profile: { ...userProfile }
      }
    });
    return store
      .dispatch(
        actions.handleUserLogin(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlyYWd1aGF5dmVzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoieXZlczIwMTgiLCJpZCI6IjdlZDAwYzA5LTY2NGItNDE0Zi04ODk2LTgwYzRmNGQ0NjMwYiIsInJvbGVJZCI6ImQ4MWJlZGZmLTk1OGEtNGRkOC04YzA1LWJjNDY4NGEzODM3NCIsImlhdCI6MTU1ODAyMDU2NH0.Ky17ZyGMtnoj-8X3ZkXOmMZ7K671EG7WZD2UIHmkBRA"
        )
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test("should not set token", () => {
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
    moaxios.stubRequest(`${API_URL}/users/current`, {
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
