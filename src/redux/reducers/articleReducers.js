import {
  ARTICLE_FETCHED,
  ARTICLE_ERROR,
  FETCHING_ASIDE_ARTICLES,
  FETCHING_ARTICLE,
  DELETE_ARTICLE
} from "../actionTypes";

const initialState = { isFetching: true, asideArticles: { articles: [] } };

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_FETCHED:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      };
    case FETCHING_ASIDE_ARTICLES:
      return {
        ...state,
        asideArticles: action.payload
      };
    case ARTICLE_ERROR:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      };
    case FETCHING_ARTICLE:
      return {
        ...state,
        isFetching: true
      };
    case DELETE_ARTICLE:
      return {
        ...state,
        response: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
