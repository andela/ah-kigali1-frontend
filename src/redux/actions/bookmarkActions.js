import axios from "../../utils/axios";
import {
  BOOKMARK_ARTICLE,
  REQUEST_SUBMITTED,
  REQUEST_FAILED
} from "../actionTypes";
import { checkAuth } from "../../utils/checkAuthUtils";

export const bookmarkSucceed = (message, articleSlug, isBookmarked) => ({
  type: BOOKMARK_ARTICLE,
  payload: { message, isBookmarked, articleSlug }
});

export const bookmarkFailed = message => ({
  type: REQUEST_FAILED,
  payload: message
});

export const bookmarkSubmitted = () => ({
  type: REQUEST_SUBMITTED
});

export const handleBookmark = (
  articleSlug,
  isBookmarked,
  { location, history }
) => async dispatch => {
  try {
    checkAuth({ location, history });
    dispatch(bookmarkSubmitted());
    const response = await axios.post(`/articles/${articleSlug}/bookmark`);
    const { message } = response.data;
    dispatch(bookmarkSucceed(message, articleSlug, !isBookmarked));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(bookmarkFailed(message));
  }
};
