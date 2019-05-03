/* eslint-disable no-case-declarations */
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

const initialState = {
  body: "",
  bodyEdit: "",
  success: "",
  error: "",
  comments: {},
  isLoading: true
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_COMMENTS:
      return {
        ...state,
        isLoading: true
      };
    case FETCHING_COMMENTS:
      return {
        ...state,
        isLoading: false,
        comments:
          action.page === 1
            ? action.comments
            : { ...state.comments, ...action.comments }
      };
    case COMMENTS_INPUT_EDIT:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    case UPDATE_COMMENT_BODY:
      return { ...state, bodyEdit: action.payload.value };
    case SET_SUCCESS_MESSAGE:
      return { ...state, success: action.payload };
    case SET_ERROR_MESSAGE:
      return { ...state, isLoading: false, error: action.payload };
    case COMMENTS_INPUT:
      return { ...state, [action.payload.field]: action.payload.value };
    case DELETE_COMMENT:
      delete state.comments[action.payload];
      return {
        ...state
      };
    case UPDATE_COMMENT:
      const { commentId, body } = action.payload;
      state.comments[commentId].body = body;
      return {
        ...state
      };
    case CREATE_NEW_COMMENT:
      return {
        ...state,
        comments: { [action.payload.id]: action.payload, ...state.comments }
      };
    default:
      return {
        ...state
      };
  }
};

export default commentReducer;
