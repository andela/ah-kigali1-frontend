import "@babel/polyfill";
import axios from "../../utils/axios";
import {
  NEW_ARTICLE,
  INPUT_CHANGE,
  FETCH_ARTICLE_TO_EDIT,
  ARTICLE_ERROR,
  SUBMITTING_ARTICLE,
  NEW_TAG,
  ARTICLE_UPDATED,
  REMOVE_TAG
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
export const handleInputField = value => ({
  type: INPUT_CHANGE,
  payload: { field: value.name, value: value.value }
});
export const handleCreateTag = value => ({
  type: NEW_TAG,
  payload: value.tag
});
export const removeTag = value => ({
  type: REMOVE_TAG,
  payload: value
});

export const newArticle = article => async dispatch => {
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
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: ARTICLE_ERROR, payload: message });
  }
};

export const editArticle = (article, slug) => async dispatch => {
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
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: ARTICLE_ERROR, payload: message });
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
