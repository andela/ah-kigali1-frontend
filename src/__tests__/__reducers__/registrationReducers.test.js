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
  it("should return the initial state", () => {
    expect(registrationReducer(undefined, {})).toEqual(initialState);
  });

  it("should return the requested state", () => {
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

  it("should return the failure state", () => {
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

  it("should return the success state", () => {
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

  it("should return the input change state", () => {
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
