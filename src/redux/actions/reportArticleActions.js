import {
  REPORT_ERROR,
  ARTICLE_REPORTED,
  REPORTING_ARTICLE
} from "../actionTypes";

import axios from "../../utils/axios";

export const reportingArticle = () => ({
  type: REPORTING_ARTICLE
});

export const reportedArticle = (slug, description) => async dispatch => {
  try {
    dispatch(reportingArticle());
    const response = await axios.put(`/articles/${slug}/report`, {
      description
    });
    dispatch({ type: ARTICLE_REPORTED, payload: response.data });
    return { ...response.data, status: response.status };
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: REPORT_ERROR, payload: message });
    return { ...error.response.data, status: error.response.status };
  }
};
