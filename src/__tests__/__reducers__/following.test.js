import followingReducer, {
  initialState
} from "../../redux/reducers/followingReducer";
import {
  FOLLOWING_FAILED,
  FOLLOWING_SUCCESS,
  WAITING_RESPONSE
} from "../../redux/actionTypes";

describe("Following reducers", () => {
  test("should return initial state", () => {
    expect(followingReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle FOLLOWING", () => {
    expect(followingReducer(initialState, { type: WAITING_RESPONSE })).toEqual({
      ...initialState,
      isFetching: true
    });
  });

  test("should handle FOLLOWING SUCCESS, if followed, the status must be true", () => {
    expect(
      followingReducer(initialState, {
        type: FOLLOWING_SUCCESS,
        payload: true
      })
    ).toEqual({ ...initialState, status: true });
  });

  test("should handle FOLLOWING SUCCESS, if unfollowed, the status must be false", () => {
    expect(
      followingReducer(initialState, {
        type: FOLLOWING_SUCCESS,
        payload: false
      })
    ).toEqual({ ...initialState, status: false });
  });

  test("should handle WAITING_RESPONSE FAILED", () => {
    expect(
      followingReducer(initialState, {
        type: FOLLOWING_FAILED,
        payload: false
      })
    ).toEqual({ ...initialState, status: false });
  });
});
