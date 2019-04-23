import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  REQUEST_SUBMITTED,
  REQUEST_FAILED
} from "../actionTypes";

export const initialState = {
  likeCount: 0,
  isSubmitting: false,
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIKE_ARTICLE:
      return { ...state, isSubmitting: false, likeCount: state.likeCount + 1 };
    case DISLIKE_ARTICLE:
      return { ...state, isSubmitting: false, likeCount: state.likeCount - 1 };
    case REQUEST_SUBMITTED:
      return { ...state, isSubmitting: true };
    case REQUEST_FAILED:
      return { ...state, message: action.payload, isSubmitting: false };
    default:
      return state;
  }
};
