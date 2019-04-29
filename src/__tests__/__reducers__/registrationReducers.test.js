import registrationReducer from "../../redux/reducers/registrationReducers";
import * as actionTypes from "../../redux/actionTypes";

const initialState = {
  user: {
    email: "",
    username: "",
    password: ""
  },
  submitted: false,
  message: "",
  success: false
};

const dummyUser = {
  email: "test@test.com",
  username: "test",
  password: "9874",
  confirmPassword: "9874"
};

describe("registration reducer", () => {
  test("should return the initial state", () => {
    expect(registrationReducer(undefined, {})).toEqual(initialState);
  });

  test("should return the requested state", () => {
    expect(
      registrationReducer(initialState, {
        type: actionTypes.REGISTER_REQUESTED,
        user: dummyUser
      })
    ).toEqual({
      ...initialState,
      submitted: true,
      message: "registration started"
    });
  });

  test("should return the failure state", () => {
    expect(
      registrationReducer(initialState, {
        type: actionTypes.REGISTER_REQUEST_FAILED,
        message: "registration failed"
      })
    ).toEqual({
      ...initialState,
      submitted: false,
      message: "registration failed"
    });
  });

  test("should return the success state", () => {
    expect(
      registrationReducer(initialState, {
        type: actionTypes.REGISTER_REQUEST_SUCCEEDED,
        payload: { user: dummyUser, message: "ok" }
      })
    ).toEqual({
      ...initialState,
      submitted: false,
      user: dummyUser,
      success: true,
      message: "ok"
    });
  });

  test("should return the input change state", () => {
    expect(
      registrationReducer(initialState, {
        type: actionTypes.REGISTER_INPUT_CHANGE,
        payload: { email: "esp@es.cd" }
      })
    ).toEqual({
      ...initialState,
      user: { ...initialState.user, ...{ email: "esp@es.cd" } }
    });
  });
});
