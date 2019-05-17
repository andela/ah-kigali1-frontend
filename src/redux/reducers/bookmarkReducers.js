import {
  BOOKMARK_ARTICLE,
  REQUEST_SUBMITTED,
  REQUEST_FAILED
} from "../actionTypes";

export const initialState = {
  isSubmitting: false,
  message: "",
  bookmarkedArticles: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOKMARK_ARTICLE:
      return {
        ...state,
        bookmarkedArticles: {
          ...state.bookmarkedArticles,
          [payload.articleSlug]: payload.isBookmarked
        },
        isSubmitting: false
      };
    case REQUEST_SUBMITTED:
      return {
        ...state,
        isSubmitting: true
      };
    case REQUEST_FAILED:
      return {
        ...state,
        message: payload,
        isSubmitting: false
      };
    default:
      return state;
  }
};
