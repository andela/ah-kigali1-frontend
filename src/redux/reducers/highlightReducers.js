import {
  SET_HIGHLIGHTED_SECTION,
  RESET_ARTICLE_HIGHLIGHT,
  SET_HIGHLIGHTS
} from "../actionTypes";

const INITIAL_STATE = {
  start: null,
  end: null,
  comment: "",
  articleHighlights: {}
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_HIGHLIGHTED_SECTION:
      return {
        ...state,
        ...payload
      };
    case RESET_ARTICLE_HIGHLIGHT:
      return {
        ...state,
        ...INITIAL_STATE,
        articleHighlights: {
          ...state.articleHighlights
        }
      };
    case SET_HIGHLIGHTS:
      return {
        ...state,
        start: null,
        end: null,
        comment: "",
        articleHighlights: {
          ...state.articleHighlights,
          ...payload
        }
      };
    default:
      return state;
  }
};
