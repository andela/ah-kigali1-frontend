import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  REQUEST_SUBMITTED,
  REQUEST_FAILED
} from "../../redux/actionTypes";
import likeReducer from "../../redux/reducers/likeReducers";

describe("test  like reducers", () => {
  const initialState = {
    likeCount: 0,
    isSubmitting: false,
    message: "",
    isLiked: false
  };
  it("should like return initial state", () => {
    expect(likeReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle submit like", () => {
    expect(likeReducer(initialState, { type: REQUEST_SUBMITTED })).toEqual({
      ...initialState,
      isSubmitting: true
    });
  });
  it("should handle like", () => {
    expect(
      likeReducer(initialState, {
        type: LIKE_ARTICLE,
        payload: "the article was liked"
      })
    ).toEqual({
      ...initialState,
      isSubmitting: false,
      likeCount: initialState.likeCount + 1,
      isLiked: true
    });
  });

  it("should handle dislike", () => {
    expect(
      likeReducer(initialState, {
        type: DISLIKE_ARTICLE,
        payload: "the article was disliked"
      })
    ).toEqual({
      ...initialState,
      isSubmitting: false,
      likeCount: initialState.likeCount - 1,
      isLiked: false
    });
  });

  it("should handle error when liking", () => {
    expect(
      likeReducer(initialState, {
        type: REQUEST_FAILED,
        payload: "an error occurs while liking"
      })
    ).toEqual({
      ...initialState,
      message: "an error occurs while liking",
      isSubmitting: false
    });
  });
});
