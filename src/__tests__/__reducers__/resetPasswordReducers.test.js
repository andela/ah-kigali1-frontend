import resetPasswordReducers, {
  INITIAL_STATE
} from "../../redux/reducers/resetPasswordReducers";
import {
  RESET_PASSWORD_INPUT_CHANGE,
  SENDING_RESET_PASSWORD_LINK,
  RESET_PASSWORD_LINK_FAILED,
  RESET_PASSWORD_LINK_SUCCESS
} from "../../redux/actionTypes";

const userInput = { name: "email", value: "me@example.com" };

describe("Login reducers", () => {
  it("should return initial state", () => {
    expect(resetPasswordReducers(undefined, {})).toEqual({
      ...INITIAL_STATE
    });
  });
  it("should handle RESET_PASSWORD_INPUT_CHANGE", () => {
    expect(
      resetPasswordReducers(INITIAL_STATE, {
        type: RESET_PASSWORD_INPUT_CHANGE,
        payload: { ...userInput }
      })
    ).toEqual({
      ...INITIAL_STATE,
      [userInput.name]: userInput.value
    });
  });
  it("should handle SENDING_RESET_PASSWORD_LINK", () => {
    expect(
      resetPasswordReducers(INITIAL_STATE, {
        type: SENDING_RESET_PASSWORD_LINK
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSubmitting: true
    });
  });
  it("should handle RESET_PASSWORD_LINK_FAILED", () => {
    const errorPayload = { message: "User not found" };
    expect(
      resetPasswordReducers(INITIAL_STATE, {
        type: RESET_PASSWORD_LINK_FAILED,
        payload: { ...errorPayload }
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSuccess: false,
      failedMessage: errorPayload.message
    });
  });
  it("should handle LOGIN_SUCCESS", () => {
    const successPayload = {
      message:
        "Password reset instructions have been sent to your account's primary email address."
    };
    expect(
      resetPasswordReducers(INITIAL_STATE, {
        type: RESET_PASSWORD_LINK_SUCCESS,
        payload: { ...successPayload }
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSuccess: true,
      successMessage: successPayload.message
    });
  });
});
