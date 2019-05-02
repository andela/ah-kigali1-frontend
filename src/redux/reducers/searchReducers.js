import {
  SEARCH_QUERY_CHANGE,
  ARTICLE_SEARCH_SUCCESS,
  SEARCHING_ARTICLES,
  ARTICLE_SEARCH_FAILED,
  CLEAR_SEARCH_RESULTS,
  SET_SUGGESTED_ARTICLES
} from "../actionTypes";

const INITIAL_STATE = {
  searchQuery: "",
  articles: {},
  authors: {},
  isLoading: true,
  errors: {},
  suggestedArticles: {}
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_QUERY_CHANGE:
      return {
        ...state,
        errors: {},
        searchQuery: payload
      };
    case SET_SUGGESTED_ARTICLES:
      return {
        ...state,
        suggestedArticles: { ...payload.articles }
      };
    case SEARCHING_ARTICLES:
      return {
        ...state,
        errors: {},
        isLoading: true
      };
    case ARTICLE_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errors: {},
        suggestedArticles: {},
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
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        articles: {},
        authors: {},
        suggestedArticles: {},
        errors: {},
        isLoading: false
      };
    default:
      return state;
  }
};
