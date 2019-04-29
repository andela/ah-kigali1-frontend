import "@babel/polyfill";

import axios from "../../utils/axios";
import {
  NEW_ARTICLE,
  FETCH_ARTICLE_TO_EDIT,
  ARTICLE_ERROR,
  SUBMITTING_ARTICLE,
  ARTICLE_UPDATED,
  CLEAR_RESPONSE
} from "../actionTypes";

export const submittingArticle = () => ({
  type: SUBMITTING_ARTICLE
});
export const articleCreated = response => ({
  type: NEW_ARTICLE,
  payload: response.data
});

export const articleUpdated = response => ({
  type: ARTICLE_UPDATED,
  payload: response.data
});

export const clearResponse = () => ({
  type: CLEAR_RESPONSE
});
export const newArticle = (article, history) => async dispatch => {
  try {
    const { title, body, description, tagsList } = article;
    dispatch(submittingArticle());
    const response = await axios.post("/articles", {
      title,
      body,
      description,
      tagsList
    });
    dispatch(articleCreated(response));
    return history.push(`/articles/${response.data.article.slug}`);
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: ARTICLE_ERROR, payload: message });
    setTimeout(() => dispatch(clearResponse()), 3000);
  }
};

export const editArticle = (article, slug, history) => async dispatch => {
  try {
    const { title, body, description, tagsList } = article;
    dispatch(submittingArticle());
    const response = await axios.put(`/articles/${slug}`, {
      title,
      body,
      description,
      tagsList
    });
    dispatch(articleUpdated(response));
    return history.push(`/articles/${response.data.article.slug}`);
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: ARTICLE_ERROR, payload: message });
    setTimeout(() => dispatch(clearResponse()), 3000);
  }
};
export const fetchOneArticle = slug => async dispatch => {
  try {
    const response = await axios.get(`/articles/${slug}`);
    dispatch({ type: FETCH_ARTICLE_TO_EDIT, payload: response.data });
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: ARTICLE_ERROR, payload: message });
  }
};
