import "@babel/polyfill";
import axios from "../../utils/axios";
import {
  ARTICLE_FETCHED,
  FETCHING_ARTICLE,
  FETCHING_ASIDE_ARTICLES,
  ARTICLE_ERROR,
  DELETE_ARTICLE
} from "../actionTypes";

export const fetchingArticle = () => ({ type: FETCHING_ARTICLE });

export const fetchArticle = slug => async dispatch => {
  try {
    dispatch(fetchingArticle);

    const response = await axios.get(`/articles/${slug}`);

    dispatch({ type: ARTICLE_FETCHED, payload: response.data });

    const response2 = await axios.get(`/articles?limit=3`);
    const newArticles = response2.data.articles.reduce(
      (accumulator, currentValue) => {
        accumulator[currentValue.id] = currentValue;
        return accumulator;
      },
      {}
    );
    dispatch({
      type: FETCHING_ASIDE_ARTICLES,
      payload: newArticles
    });
  } catch (error) {
    const message = error.response.data;
    dispatch({ type: ARTICLE_ERROR, payload: message });
  }
};

export const deleteArticle = slug => async dispatch => {
  try {
    const response = await axios.delete(`/articles/${slug}`);
    dispatch({ type: DELETE_ARTICLE, payload: response.data });
    return { message: response.data, status: response.status };
  } catch (error) {
    const message = error.response.data;
    dispatch({ type: DELETE_ARTICLE, payload: message });
    return { message, status: error.response.status };
  }
};
