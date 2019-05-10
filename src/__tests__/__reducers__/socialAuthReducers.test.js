import socialAuth from "../../redux/reducers/socialAuthReducers";
import {
  SOCIAL_AUTH_FAILED,
  SOCIAL_AUTH_SUCCESS,
  SUBMITTING_SOCIAL_AUTH
} from "../../redux/actionTypes";

const INITIAL_STATE = {
  isSubmitting: true,
  socialAuthSuccess: false,
  socialAuthFailed: false
};
describe("Social Auth reducers", () => {
  test("initial state", () => {
    expect(socialAuth(undefined, {})).toEqual({ ...INITIAL_STATE });
  });

  test("should set submitting to true", () => {
    expect(
      socialAuth(INITIAL_STATE, {
        type: SUBMITTING_SOCIAL_AUTH
      })
    ).toEqual({ ...INITIAL_STATE, isSubmitting: true });
  });

  test("should set socialAuthFailed to false", () => {
    expect(
      socialAuth(INITIAL_STATE, {
        type: SOCIAL_AUTH_FAILED
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSubmitting: false,
      socialAuthFailed: true
    });
  });

  test("should set socialAuthSuccess to false", () => {
    expect(
      socialAuth(undefined, {
        type: SOCIAL_AUTH_SUCCESS
      })
    ).toEqual({
      ...INITIAL_STATE,
      isSubmitting: false,
      socialAuthSuccess: true
    });
  });
});
