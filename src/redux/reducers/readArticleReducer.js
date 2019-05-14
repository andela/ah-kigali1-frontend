/* eslint-disable no-case-declarations */
import {
  ARTICLE_FETCHED,
  ARTICLE_ERROR,
  FETCHING_ASIDE_ARTICLES,
  FETCHING_ARTICLE,
  DELETE_ARTICLE,
  UPDATE_BODY_WITH_HIGHLIGHT
} from "../actionTypes";

const initialState = {
  isFetching: true,
  asideArticles: {}
};

const readArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_FETCHED:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      };
    case UPDATE_BODY_WITH_HIGHLIGHT:
      return {
        ...state,
        article: {
          ...state.article,
          body: action.payload
        }
      };
    case FETCHING_ASIDE_ARTICLES:
      return {
        ...state,
        asideArticles: { ...state.asideArticles, ...action.payload }
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

export default readArticleReducer;
