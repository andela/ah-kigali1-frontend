import updatePassword, {
  INITIAL_STATE
} from "../../redux/reducers/updatePasswordReducers";

import {
  PASSWORD_UPDATE_FAILED,
  UPDATE_PASSWORD_INPUT_CHANGE,
  PASSWORD_UPDATE_SUCCESS,
  UPDATING_PASSWORD
} from "../../redux/actionTypes";

describe("Update password reducers", () => {
  const data = {
    password: { field: "password", value: "password" },
    confirmPassword: { field: "password", value: "password12" }
  };
  test("returns initial state", () => {
    expect(updatePassword(undefined, {})).toEqual({
      ...INITIAL_STATE
    });
  });

  test("updates the state on UPDATE_PASSWORD_INPUT_CHANGE action", () => {
    expect(
      updatePassword(INITIAL_STATE, {
        type: UPDATE_PASSWORD_INPUT_CHANGE,
        payload: { ...data.password }
      })
    ).toEqual({
      ...INITIAL_STATE,
      [data.password.field]: data.password.value
    });
    expect(
      updatePassword(INITIAL_STATE, {
        type: UPDATE_PASSWORD_INPUT_CHANGE,
        payload: { ...data.confirmPassword }
      })
    ).toEqual({
      ...INITIAL_STATE,
      [data.confirmPassword.field]: data.confirmPassword.value
    });
  });

  test("updates state on  UPDATING_PASSWORD", () => {
    expect(
      updatePassword(INITIAL_STATE, {
        type: UPDATING_PASSWORD
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSubmitting: true
    });
  });

  test("updates state on PASSWORD_UPDATE_SUCCESS", () => {
    const payload = { message: "Password updated successfully" };
    expect(
      updatePassword(INITIAL_STATE, {
        type: PASSWORD_UPDATE_SUCCESS,
        payload
      })
    ).toEqual({
      ...INITIAL_STATE,
      message: payload.message,
      passwordUpdateSuccess: true
    });
  });

  test("updates state on  PASSWORD_UPDATE_FAILED", () => {
    const payload = { message: "Invalid password", errors: {} };
    expect(
      updatePassword(INITIAL_STATE, {
        type: PASSWORD_UPDATE_FAILED,
        payload
      })
    ).toEqual({
      ...INITIAL_STATE,
      errors: { message: payload.message, ...payload.errors }
    });
  });
});
