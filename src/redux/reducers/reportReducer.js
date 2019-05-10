import {
  ARTICLE_REPORTED,
  REPORT_ERROR,
  REPORTING_ARTICLE
} from "../actionTypes";

const initialState = {
  response: "",
  reporting: false
};

export const reportArticle = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_REPORTED:
      return {
        ...state,
        response: action.payload,
        reporting: false
      };
    case REPORT_ERROR:
      return {
        ...state,
        response: action.payload,
        reporting: false
      };
    case REPORTING_ARTICLE:
      return {
        ...state,
        reporting: true
      };
    default:
      return state;
  }
};
