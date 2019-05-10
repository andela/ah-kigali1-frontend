import loginReducers, {
  INITIAL_STATE
} from "../../redux/reducers/authReducers";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_INPUT_CHANGE,
  SET_CURRENT_USER,
  SUBMITTING_LOGIN_CREDENTIALS,
  IS_OPENING_SOCIAL_AUTH_PROVIDER,
  CANCEL_SOCIAL_AUTH
} from "../../redux/actionTypes";

const emailInput = { name: "email", value: "me@example.com" };
const passwordInput = { name: "email", value: "password" };

describe("Login reducers", () => {
  test("should return initial state", () => {
    expect(loginReducers(undefined, {})).toEqual({
      ...INITIAL_STATE
    });
  });

  test("should handle LOGIN_INPUT_CHANGE", () => {
    expect(
      loginReducers(INITIAL_STATE, {
        type: LOGIN_INPUT_CHANGE,
        payload: { ...emailInput }
      })
    ).toEqual({
      ...INITIAL_STATE,
      [emailInput.name]: emailInput.value
    });
    expect(
      loginReducers(INITIAL_STATE, {
        type: LOGIN_INPUT_CHANGE,
        payload: { ...passwordInput }
      })
    ).toEqual({
      ...INITIAL_STATE,
      [passwordInput.name]: passwordInput.value
    });
  });

  test("should handle SUBMITTING_LOGIN_CREDENTIALS", () => {
    expect(
      loginReducers(INITIAL_STATE, {
        type: SUBMITTING_LOGIN_CREDENTIALS
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSubmitting: true
    });
  });

  test("should handle LOGIN_FAILED", () => {
    const errorPayload = { message: "Invalid email or password", errors: {} };
    expect(
      loginReducers(INITIAL_STATE, {
        type: LOGIN_FAILED,
        payload: { ...errorPayload }
      })
    ).toEqual({
      ...INITIAL_STATE,
      errors: { message: errorPayload.message, ...errorPayload.errors }
    });
  });

  test("should handle LOGIN_SUCCESS", () => {
    const successPayload = {
      message: "Sign in successfully",
      token: "qwertyuiop.1234567890"
    };
    expect(
      loginReducers(INITIAL_STATE, {
        type: LOGIN_SUCCESS,
        payload: successPayload
      })
    ).toEqual({
      ...INITIAL_STATE,
      loginSuccess: true,
      token: successPayload.token
    });
  });

  test("should handle  IS_OPENING_SOCIAL_AUTH_PROVIDER", () => {
    expect(
      loginReducers(INITIAL_STATE, {
        type: IS_OPENING_SOCIAL_AUTH_PROVIDER
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSubmitting: true
    });
    expect(
      loginReducers(INITIAL_STATE, {
        type: CANCEL_SOCIAL_AUTH
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSubmitting: false
    });
  });

  it("should handle  SET_CURRENT_USER", () => {
    expect(
      loginReducers(INITIAL_STATE, {
        type: SET_CURRENT_USER,
        payload: { name: "musigwa" }
      })
    ).toEqual({
      ...INITIAL_STATE,
      currentUser: { name: "musigwa" }
    });
  });
});
