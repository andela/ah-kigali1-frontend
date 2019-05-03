import "@babel/polyfill";
import axios from "../../utils/axios";
import {
  SET_SUCCESS_MESSAGE,
  SET_ERROR_MESSAGE,
  COMMENTS_INPUT,
  COMMENTS_INPUT_EDIT,
  FETCHING_COMMENTS,
  UPDATE_COMMENT_BODY,
  SET_LOADING_COMMENTS,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  CREATE_NEW_COMMENT
} from "../actionTypes";
import { arrayToObject } from "../../utils/helperFunctions";

export const setComments = (comments, page = 1) => ({
  type: FETCHING_COMMENTS,
  comments: arrayToObject(comments, "id"),
  page
});

export const setSuccessMessage = success => ({
  type: SET_SUCCESS_MESSAGE,
  payload: success
});

export const setErrorMessage = error => ({
  type: SET_ERROR_MESSAGE,
  payload: error
});

export const handleCommentsInput = payload => ({
  type: COMMENTS_INPUT,
  payload
});

export const handleCommentsInputEdit = payload => ({
  type: COMMENTS_INPUT_EDIT,
  payload
});

export const setBodyEdit = payload => ({
  type: UPDATE_COMMENT_BODY,
  payload
});
export const setLoading = () => ({
  type: SET_LOADING_COMMENTS
});
export const inputHandleAsync = payload => dispatch =>
  new Promise(resolve => {
    dispatch(handleCommentsInput(payload));
    resolve(true);
  });

export const fetchComments = (slug, page) => async dispatch => {
  dispatch(setLoading());
  try {
    const response = await axios.get(
      `/articles/${slug}/comments?pageNumber=${page}`
    );
    const { comments } = response.data.article;
    dispatch(setComments(comments, page));
  } catch (errorResponse) {
    const { message } = errorResponse.response.data;
    dispatch(setErrorMessage(message));
  }
};

export const createComment = (comments, slug) => async dispatch => {
  try {
    const response = await axios.post(`/articles/${slug}/comments`, {
      body: comments
    });
    const { message, comment } = response.data;
    dispatch(setSuccessMessage(message));
    dispatch(handleCommentsInput({ field: "body", value: "" }));
    dispatch({
      type: CREATE_NEW_COMMENT,
      payload: comment
    });
  } catch (errorResponse) {
    const { message } = errorResponse.response.data;
    dispatch(setErrorMessage(message));
  }
};
export const deleteComment = (commentId, slug) => async dispatch => {
  try {
    const response = await axios.delete(
      `articles/${slug}/comments/${commentId}`
    );
    const { message } = response.data;
    dispatch(setSuccessMessage(message));
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId
    });
  } catch (errorResponse) {
    const { message } = errorResponse.response.data;
    dispatch(setErrorMessage(message));
  }
};

export const updateComment = (
  { commentId, comments },
  slug
) => async dispatch => {
  try {
    const response = await axios.put(`articles/${slug}/comments/${commentId}`, {
      body: comments
    });
    const { message } = response.data;
    dispatch(setSuccessMessage(message));
    dispatch({
      type: UPDATE_COMMENT,
      payload: { commentId, body: comments }
    });
  } catch (errorResponse) {
    const { message } = errorResponse.response.data;
    dispatch(setErrorMessage(message));
  }
};
