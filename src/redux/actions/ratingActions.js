import "@babel/polyfill";
import axios from "../../utils/axios";
import {
  RATING_ARTICLE,
  RATING_FAILURE,
  RATING_SUCCESS,
  RATING_FOUND
} from "../actionTypes";

export const ratingArticle = () => ({ type: RATING_ARTICLE });

export const rateArticle = (slug, rate) => async dispatch => {
  try {
    dispatch(ratingArticle());
    const response = await axios.post(`/articles/${slug}/rating`, {
      rating: rate
    });
    dispatch({ type: RATING_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    const { message } = error.response.data;
    if (error.response.status === 409) {
      const response = await axios.put(`/articles/${slug}/rating`, {
        rating: rate
      });
      dispatch({ type: RATING_SUCCESS, payload: response.data });
    }
    dispatch({
      type: RATING_FAILURE,
      payload: message
    });
    return message;
  }
};

export const fetchRatings = slug => async dispatch => {
  try {
    dispatch(ratingArticle());
    const response = await axios.get(`/articles/${slug}/rating`);
    dispatch({ type: RATING_FOUND, payload: response.data });
    return response.data;
  } catch (error) {
    const { message } = error.response.data;
    dispatch({
      type: RATING_FAILURE,
      payload: message
    });
    return message;
  }
};
