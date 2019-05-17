import {
  FETCHING_ALL_ARTICLES,
  ALL_ARTICLES,
  ALL_ARTICLES_ERROR
} from "../actionTypes";

export const initialState = {
  allArticles: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_ARTICLES:
      return {
        ...state,
        allArticles: payload
      };
    case FETCHING_ALL_ARTICLES:
      return {
        ...state,
        isFetching: true
      };
    case ALL_ARTICLES_ERROR:
      return {
        ...state,
        payload
      };
    default:
      return state;
  }
};
