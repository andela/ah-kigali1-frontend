import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "../../utils/axios";
import * as actions from "../../redux/actions/updatePasswordActions";
import {
  UPDATE_PASSWORD_INPUT_CHANGE,
  UPDATING_PASSWORD,
  PASSWORD_UPDATE_FAILED,
  PASSWORD_UPDATE_SUCCESS
} from "../../redux/actionTypes";

const DEV_BASE_URL = "http://localhost:3000/api/v1";
const mockStore = configureMockStore([thunk]);
let store;
describe("update password actions ceators", () => {
  beforeEach(() => {
    moxios.install(axios);
    store = mockStore({});
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });
  it("dispatches UPDATE_PASSWORD_INPUT_CHANGE", () => {
    const payload = { field: "password", value: "password" };
    const expectedActions = {
      type: UPDATE_PASSWORD_INPUT_CHANGE,
      payload
    };
    expect(actions.handleInputChange(payload.field, payload.value)).toEqual(
      expectedActions
    );
  });
  it("dispatches PASSWORD_UPDATE_FAILED", () => {
    const payload = { message: "Invalid or expired token", errors: {} };
    const token =
      "eyJhbGciOiJIUzI1NiJ9.bHVjLmJheW9AZ21haWwuY29t.izmRITmo5Ru923DNd0AzpC2ULtO26-nUJU2vzS7hhGc";
    moxios.stubRequest(`${DEV_BASE_URL}/users/${token}/password`, {
      status: 404,
      response: {
        ...payload
      }
    });
    const expectedActions = [
      {
        type: UPDATING_PASSWORD
      },
      {
        type: PASSWORD_UPDATE_FAILED,
        payload: { ...payload }
      }
    ];
    return store.dispatch(actions.handleUpdatePassword("password")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("dispatches PASSWORD_UPDATE_SUCCESS", () => {
    const payload = { message: "Password updated successfully" };
    const token =
      "eyJhbGciOiJIUzI1NiJ9.bHVjLmJheW9AZ21haWwuY29t.izmRITmo5Ru923DNd0AzpC2ULtO26-nUJU2vzS7hhGc";
    moxios.stubRequest(`${DEV_BASE_URL}/users/${token}/password`, {
      status: 200,
      response: {
        ...payload
      }
    });
    const expectedActions = [
      {
        type: UPDATING_PASSWORD
      },
      {
        type: PASSWORD_UPDATE_SUCCESS,
        payload: { ...payload }
      }
    ];
    return store.dispatch(actions.handleUpdatePassword("password")).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
