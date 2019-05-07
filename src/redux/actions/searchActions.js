import "@babel/polyfill";
import axios from "../../utils/axios";
import {
  SEARCHING_ARTICLES,
  SEARCH_QUERY_CHANGE,
  ARTICLE_SEARCH_FAILED,
  ARTICLE_SEARCH_SUCCESS,
  CLEAR_SEARCH_RESULTS,
  SET_SUGGESTED_ARTICLES
} from "../actionTypes";
import { arrayToObject } from "../../utils/helperFunctions";

export const searchURL = (searchQuery, pageNumber = 1) =>
  `/articles?keyword=${searchQuery}&page=${pageNumber}`;

export const handleInputChange = value => ({
  type: SEARCH_QUERY_CHANGE,
  payload: value
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

const searchFailed = (message, errors) => ({
  type: ARTICLE_SEARCH_FAILED,
  payload: { message, ...errors }
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
    const response = await axios.get(`${searchURL(searchQuery, pageNumber)}`);

    if (pageNumber === 1) {
      dispatch(clearSearchResults());
    }
    const { articles, message } = response.data;
    // const authorsObject = mapValues(
    //   arrayToObject(articles, "userId"),
    //   article => ({ ...article.author, id: article.userId })
    // );
    const authors = Object.values(arrayToObject(articles, "userId")).map(
      article => ({ ...article.author, id: article.userId })
    );
    dispatch({
      type: ARTICLE_SEARCH_SUCCESS,
      payload: {
        message,
        articles: arrayToObject(articles, "id"),
        authors: arrayToObject(authors, "id")
      }
    });
  } catch (error) {
    const {
      data: { message, errors }
    } = error.response;
    dispatch(searchFailed(message, errors));
  }
  if (history) {
    history.push(`/search?keyword=${searchQuery}`);
  }
};

export const authSuggestArticles = searchQuery => async dispatch => {
  dispatch(handleInputChange(searchQuery));
  try {
    const response = await axios.get(`${searchURL(searchQuery)}&limit=${4}`);
    const { articles } = response.data;
    dispatch({
      type: SET_SUGGESTED_ARTICLES,
      payload: { articles: arrayToObject(articles, "id") }
    });
  } catch (error) {
    const {
      data: { message, errors }
    } = error.response;
    dispatch(searchFailed(message, errors));
  }
};
