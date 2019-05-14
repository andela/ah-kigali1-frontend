import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moxios from "moxios";
import "isomorphic-fetch";
import axios from "../../utils/axios";
import {
  setComments,
  setSuccessMessage,
  setErrorMessage,
  fetchComments,
  createComment,
  deleteComment,
  updateComment,
  likeAComment
} from "../../redux/actions/commentActions";
import {
  FETCHING_COMMENTS,
  CREATE_NEW_COMMENT,
  SET_LOADING_COMMENTS,
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  COMMENTS_INPUT,
  UPDATE_COMMENT,
  CHANGE_LIKE
} from "../../redux/actionTypes";

const { API_URL } = process.env;
const mockStore = configureStore([thunk]);
let store;
const comments = { id: "123", body: "comment body" };
const slug = "how-to-train-your-drago-lkdw66uc4h";
const commentId = "3885730kjdjfkskd";

describe("comments actions", () => {
  describe("actions creates", () => {
    test("should dispatch setComments actions", () => {
      const comment = [{ id: "123", body: "comment body" }];
      const expectedAction = {
        type: "FETCHING_COMMENTS",
        comments: { "123": { id: "123", body: "comment body" } },
        page: 1
      };
      expect(setComments(comment)).toEqual(expectedAction);
    });

    test("should dispatch setSuccessMessage actions", () => {
      const expectedAction = {
        type: SET_SUCCESS_MESSAGE,
        payload: "hello world"
      };
      const success = setSuccessMessage("hello world");
      expect(success).toEqual(expectedAction);
    });

    test("should dispatch setErrorMessage actions", () => {
      const expectedAction = {
        type: SET_ERROR_MESSAGE,
        payload: "failed"
      };
      const error = setErrorMessage("failed");
      expect(error).toEqual(expectedAction);
    });
  });

  describe("async actions", () => {
    beforeEach(() => {
      moxios.install(axios);
      store = mockStore({});
    });
    afterEach(() => {
      moxios.uninstall(axios);
    });

    describe("fetchComments()", () => {
      test("should fetch all comments", () => {
        const expectedAction = [
          { type: SET_LOADING_COMMENTS },
          { type: FETCHING_COMMENTS, comments: {}, page: 1 }
        ];
        moxios.stubRequest(
          `${API_URL}/articles/${slug}/comments?pageNumber=1`,
          {
            status: 200,
            response: {
              article: comments
            }
          }
        );
        return store.dispatch(fetchComments(slug, 1)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedAction);
        });
      });

      test("should throw error on fetching", () => {
        const expectedActions = [
          { type: SET_LOADING_COMMENTS },
          {
            type: SET_ERROR_MESSAGE,
            payload: "There is no article with that slug"
          }
        ];
        moxios.stubRequest(
          `${API_URL}/articles/${slug}/comments?pageNumber=1`,
          {
            status: 404,
            response: {
              message: "There is no article with that slug"
            }
          }
        );
        return store.dispatch(fetchComments(slug, 1)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe("createComment()", () => {
      test("should create a new comment", () => {
        const expectedActions = [
          { type: SET_SUCCESS_MESSAGE, payload: "Comments created" },
          { type: COMMENTS_INPUT, payload: { field: "body", value: "" } },
          { type: CREATE_NEW_COMMENT, payload: "article" }
        ];
        moxios.stubRequest(`${API_URL}/articles/${slug}/comments`, {
          status: 201,
          response: {
            message: "Comments created",
            comment: "article"
          }
        });
        return store.dispatch(createComment("New article", slug)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });

      test("should fail to to create a new comment", () => {
        const expectedActions = [
          { type: SET_ERROR_MESSAGE, payload: "failed" }
        ];
        moxios.stubRequest(`${API_URL}/articles/${slug}/comments`, {
          status: 400,
          response: {
            message: "failed"
          }
        });
        return store.dispatch(createComment("New article", slug)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe("deleteComment()", () => {
      test("should delete comment successfully", () => {
        const expectedActions = [
          { payload: "Comment deleted", type: "SET_SUCCESS_MESSAGE" },
          { payload: "3885730kjdjfkskd", type: " DELETE_COMMENT" }
        ];
        moxios.stubRequest(
          `${API_URL}/articles/${slug}/comments/${commentId}`,
          {
            status: 200,
            response: {
              message: "Comment deleted"
            }
          }
        );
        return store.dispatch(deleteComment(commentId, slug)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });

      test("should fail to delete comment", () => {
        const expectedActions = [
          { type: SET_ERROR_MESSAGE, payload: "failed" }
        ];
        moxios.stubRequest(
          `${API_URL}/articles/${slug}/comments/${commentId}`,
          {
            status: 400,
            response: {
              message: "failed"
            }
          }
        );
        return store.dispatch(deleteComment(commentId, slug)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });

    describe("updateComment()", () => {
      test("should update comment successfully", () => {
        const expectedActions = [
          { payload: "Comment updated", type: "SET_SUCCESS_MESSAGE" },
          {
            payload: { body: "new comment", commentId: "3885730kjdjfkskd" },
            type: UPDATE_COMMENT
          }
        ];
        moxios.stubRequest(
          `${API_URL}/articles/${slug}/comments/${commentId}`,
          {
            status: 200,
            response: {
              message: "Comment updated"
            }
          }
        );
        return store
          .dispatch(updateComment({ comments: "new comment", commentId }, slug))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });

      test("should update comment successfully", () => {
        const expectedActions = [
          {
            type: SET_ERROR_MESSAGE,
            payload: "Comment updated failed"
          }
        ];
        moxios.stubRequest(
          `${API_URL}/articles/${slug}/comments/${commentId}`,
          {
            status: 400,
            response: {
              message: "Comment updated failed"
            }
          }
        );
        return store
          .dispatch(updateComment({ comments: "new comment", commentId }, slug))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedActions);
          });
      });
    });
    describe("likeAComment()", () => {
      test("should like successfully", () => {
        const expectedActions = [
          {
            type: CHANGE_LIKE,
            payload: {
              commentId: "3885730kjdjfkskd",
              like: undefined,
              liked: true
            }
          }
        ];
        moxios.stubRequest(
          `${API_URL}/articles/${slug}/comments/${commentId}/likes`,
          {
            status: 200,
            response: {
              message: "Comment liked",
              updatedComment: "Hello world"
            }
          }
        );
        return store.dispatch(likeAComment(commentId, slug)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
      test("should fail to like", () => {
        const expectedActions = [
          { type: "SET_ERROR_MESSAGE", payload: "Error" }
        ];
        moxios.stubRequest(
          `${API_URL}/articles/${slug}/comments/${commentId}/likes`,
          {
            status: 400,
            response: {
              message: "Error"
            }
          }
        );
        return store.dispatch(likeAComment(commentId, slug)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
    });
  });
});
