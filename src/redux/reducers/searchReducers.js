import {
  SEARCH_QUERY_CHANGE,
  ARTICLE_SEARCH_SUCCESS,
  SEARCHING_ARTICLES,
  ARTICLE_SEARCH_FAILED
} from "../actionTypes";

const INITIAL_STATE = {
  searchQuery: "",
  articles: {},
  authors: {},
  isLoading: true,
  errors: {}
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_QUERY_CHANGE:
      return {
        ...state,
        searchQuery: payload
      };
    case SEARCHING_ARTICLES:
      return {
        ...state,
        isLoading: true
      };
    case ARTICLE_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: payload.message,
        articles: { ...state.articles, ...payload.articles },
        authors: { ...state.authors, ...payload.authors }
      };
    case ARTICLE_SEARCH_FAILED:
      return {
        ...state,
        isLoading: false,
        errors: {
          message: payload.message,
          ...payload.errors
        }
      };
    default:
      return state;
  }
};
