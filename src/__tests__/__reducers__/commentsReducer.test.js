import commentReducer from "../../redux/reducers/CommentReducer";
import {
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  COMMENTS_INPUT,
  COMMENTS_INPUT_EDIT,
  FETCHING_COMMENTS,
  UPDATE_COMMENT_BODY
} from "../../redux/actionTypes";

const testInput = { field: "body", value: "hello" };
const initialState = {
  body: "",
  bodyEdit: "",
  success: "",
  error: "",
  comments: {},
  isLoading: false
};

describe("team reducer", () => {
  test("should handle COMMENTS_INPUT", () => {
    expect(
      commentReducer(initialState, {
        type: COMMENTS_INPUT_EDIT,
        payload: testInput
      })
    ).toEqual({
      ...initialState,
      body: "hello"
    });
  });

  test("should handle COMMENTS_INPUT_EDIT", () => {
    expect(
      commentReducer(initialState, {
        type: COMMENTS_INPUT,
        payload: { ...testInput, field: "bodyEdit" }
      })
    ).toEqual({
      ...initialState,
      bodyEdit: "hello"
    });
  });

  test("should handle COMMENTS_INPUT_EDIT reducer", () => {
    expect(
      commentReducer(initialState, {
        type: FETCHING_COMMENTS,
        comments: {
          id: "dkkd87348374",
          body: "comment body"
        }
      })
    ).toEqual({
      ...initialState,
      comments: {
        id: "dkkd87348374",
        body: "comment body"
      }
    });
  });

  test("should handle UPDATE_COMMENT_BODY", () => {
    expect(
      commentReducer(initialState, {
        type: UPDATE_COMMENT_BODY,
        payload: { ...testInput, field: "bodyEdit" }
      })
    ).toEqual({
      ...initialState,
      bodyEdit: "hello"
    });
  });
  test("should handle SET_SUCCESS_MESSAGE", () => {
    expect(
      commentReducer(initialState, {
        type: SET_SUCCESS_MESSAGE,
        payload: "success message"
      })
    ).toEqual({
      ...initialState,
      success: "success message"
    });
  });
  test("should handle SET_ERROR_MESSAGE", () => {
    expect(
      commentReducer(initialState, {
        type: SET_ERROR_MESSAGE,
        payload: "error message"
      })
    ).toEqual({
      ...initialState,
      error: "error message"
    });
  });
});
