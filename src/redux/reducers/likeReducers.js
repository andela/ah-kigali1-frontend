import { LIKE_ARTICLE, DISLIKE_ARTICLE } from "../actionTypes";

export const initialState = {
  likeCount: 0,
  isSubmitting: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIKE_ARTICLE:
      return { ...state, likeCount: state.likeCount + 1 };
    case DISLIKE_ARTICLE:
      return { ...state, likeCount: state.likeCount - 1 };
    default:
      return state;
  }
};
