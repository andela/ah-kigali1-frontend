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
  it("returns initial state", () => {
    expect(updatePassword(undefined, {})).toEqual({
      ...INITIAL_STATE
    });
  });
  it("returns state with update password and confirm password", () => {
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
});
