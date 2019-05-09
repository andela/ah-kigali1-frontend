import followingReducer, {
  initialState
} from "../../redux/reducers/followingReducer";
import {
  FOLLOWING_FAILED,
  FOLLOWING_SUCCESS,
  WAITING_RESPONSE
} from "../../redux/actionTypes";

describe("Following reducers", () => {
  it("should return initial state", () => {
    expect(followingReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle FOLLOWING", () => {
    expect(followingReducer(initialState, { type: WAITING_RESPONSE })).toEqual({
      ...initialState,
      isFetching: true
    });
  });

  it("should handle FOLLOWING SUCCESS, if followed, the status must be true", () => {
    expect(
      followingReducer(initialState, {
        type: FOLLOWING_SUCCESS,
        payload: true
      })
    ).toEqual({ ...initialState, status: true });
  });

  it("should handle FOLLOWING SUCCESS, if unfollowed, the status must be false", () => {
    expect(
      followingReducer(initialState, {
        type: FOLLOWING_SUCCESS,
        payload: false
      })
    ).toEqual({ ...initialState, status: false });
  });

  it("should handle WAITING_RESPONSE FAILED", () => {
    expect(
      followingReducer(initialState, {
        type: FOLLOWING_FAILED,
        payload: false
      })
    ).toEqual({ ...initialState, status: false });
  });
});
