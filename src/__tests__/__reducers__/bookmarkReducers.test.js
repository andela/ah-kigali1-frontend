import {
  BOOKMARK_ARTICLE,
  REQUEST_SUBMITTED,
  REQUEST_FAILED
} from "../../redux/actionTypes";
import bookmarkReducer, {
  initialState
} from "../../redux/reducers/bookmarkReducers";

describe("test  bookmark reducers", () => {
  test("should return initial state", () => {
    expect(bookmarkReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle submit bookmark", () => {
    expect(bookmarkReducer(initialState, { type: REQUEST_SUBMITTED })).toEqual({
      ...initialState,
      isSubmitting: true
    });
  });

  test("should handle bookmark", () => {
    initialState.isBookmarked = false;
    expect(
      bookmarkReducer(initialState, {
        type: BOOKMARK_ARTICLE,
        payload: {
          message: "the article's bookmark was canceled",
          isBookmarked: true,
          articleSlug: "a-fake-slug"
        }
      })
    ).toEqual({
      ...initialState,
      isSubmitting: false,
      bookmarkedArticles: { "a-fake-slug": true }
    });
  });

  test("should handle cancel bookmark", () => {
    initialState.isBookmarked = true;
    expect(
      bookmarkReducer(initialState, {
        type: BOOKMARK_ARTICLE,
        payload: {
          message: "the article's bookmark was canceled",
          isBookmarked: false,
          articleSlug: "a-fake-slug"
        }
      })
    ).toEqual({
      ...initialState,
      isSubmitting: false,
      bookmarkedArticles: { "a-fake-slug": false }
    });
  });

  test("should handle errors when bookmarking", () => {
    expect(
      bookmarkReducer(initialState, {
        type: REQUEST_FAILED,
        payload: "An error occurs while bookmarking"
      })
    ).toEqual({
      ...initialState,
      message: "An error occurs while bookmarking",
      isSubmitting: false
    });
  });
});
