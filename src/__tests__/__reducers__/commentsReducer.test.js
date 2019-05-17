import commentReducer from "../../redux/reducers/CommentReducer";
import {
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  COMMENTS_INPUT,
  COMMENTS_INPUT_EDIT,
  FETCHING_COMMENTS,
  UPDATE_COMMENT_BODY,
  SET_LOADING_COMMENTS,
  CHANGE_LIKE,
  CREATE_NEW_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
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
  test("should handle SET_LOADING_COMMENTS", () => {
    expect(
      commentReducer(initialState, {
        type: SET_LOADING_COMMENTS,
        isLoading: true
      })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test("should handle CHANGE_LIKE", () => {
    const comments = {
      commentId: "9324fbf4-095a-4637-8aff-05d871fc5fc0",
      like: 0,
      liked: false
    };
    expect(
      commentReducer(initialState, {
        type: CHANGE_LIKE,
        payload: comments
      })
    ).toEqual({
      body: "",
      bodyEdit: "",
      success: "",
      error: "",
      comments: {
        "9324fbf4-095a-4637-8aff-05d871fc5fc0": { like: 0, liked: false }
      },
      isLoading: false
    });
  });

  test("should handle CREATE_NEW_COMMENT", () => {
    const comments = {
      id: "9324fbf4-095a-4637-8aff-05d871fc5fc0",
      body: "hello world"
    };
    const cr = commentReducer(initialState, {
      type: CREATE_NEW_COMMENT,
      payload: comments
    });
    expect(cr).toEqual({
      body: "",
      bodyEdit: "",
      success: "",
      error: "",
      comments: {
        "9324fbf4-095a-4637-8aff-05d871fc5fc0": {
          id: "9324fbf4-095a-4637-8aff-05d871fc5fc0",
          body: "hello world"
        }
      },
      isLoading: false
    });
  });

  test("should handle UPDATE_COMMENT", () => {
    const comments = {
      commentId: "9324fbf4-095a-4637-8aff-05d871fc5fc0",
      body: "hello world"
    };
    expect(
      commentReducer(initialState, {
        type: UPDATE_COMMENT,
        payload: comments
      })
    ).toEqual({
      body: "",
      bodyEdit: "",
      success: "",
      error: "",
      comments: {
        "9324fbf4-095a-4637-8aff-05d871fc5fc0": {
          body: "hello world"
        }
      },
      isLoading: false
    });
  });

  test("should handle DELETE_COMMENT", () => {
    const comments = {
      commentId: "9324fbf4-095a-4637-8aff-05d871fc5fc0",
      body: "hello world"
    };
    expect(
      commentReducer(initialState, {
        type: DELETE_COMMENT,
        payload: comments.commentId
      })
    ).toEqual(initialState);
  });
});
