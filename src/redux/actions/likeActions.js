import axios from "../../utils/axios";
import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  REQUEST_SUBMITTED,
  REQUEST_FAILED
} from "../actionTypes";

export const likeSucceed = message => ({
  type: LIKE_ARTICLE,
  payload: message
});

export const dislikeSucceed = message => ({
  type: DISLIKE_ARTICLE,
  payload: message
});

export const likeFailed = message => ({
  type: REQUEST_FAILED,
  payload: message
});

export const likeSubmitted = () => ({
  type: REQUEST_SUBMITTED
});
export const handleDislike = articleSlug => async dispatch => {
  try {
    dispatch(likeSubmitted());
    const response = await axios.post(`/articles/${articleSlug}/dislikes`);
    const { message } = response.data;
    dispatch(dislikeSucceed(message));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(likeFailed(message));
  }
};

export const handleLike = articleSlug => async dispatch => {
  try {
    dispatch(likeSubmitted());
    const response = await axios.post(`/articles/${articleSlug}/likes`);
    const { message } = response.data;
    dispatch(likeSucceed(message));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(likeFailed(message));
  }
};
