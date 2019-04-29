import "@babel/polyfill";
import _ from "lodash";
import axios from "../../utils/axios";
import {
  SEARCHING_ARTICLES,
  SEARCH_QUERY_CHANGE,
  ARTICLE_SEARCH_FAILED,
  ARTICLE_SEARCH_SUCCESS,
  CLEAR_SEARCH_RESULTS
} from "../actionTypes";
import { arrayToObject } from "../../utils/helperFunctions";

export const handleInputChange = value => ({
  type: SEARCH_QUERY_CHANGE,
  payload: value
});
export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});
export const fetchResults = (
  searchQuery,
  pageNumber = 1,
  history
) => async dispatch => {
  dispatch({
    type: SEARCHING_ARTICLES
  });
  try {
    const response = await axios.get(
      `/articles?keyword=${searchQuery}&page=${pageNumber}`
    );
    if (pageNumber === 1) {
      dispatch(clearSearchResults());
    }
    const { articles, message } = response.data;
    const authorsObject = _.mapValues(
      arrayToObject(articles, "userId"),
      article => ({ ...article.author, id: article.userId })
    );
    dispatch({
      type: ARTICLE_SEARCH_SUCCESS,
      payload: {
        message,
        articles: { ...arrayToObject(articles, "id") },
        authors: { ...authorsObject }
      }
    });
    if (history) {
      history.push(`/search?keyword=${searchQuery}`);
    }
  } catch (error) {
    const {
      data: { message, errors }
    } = error.response;
    dispatch({
      type: ARTICLE_SEARCH_FAILED,
      payload: { ...errors, message }
    });
  }
};
