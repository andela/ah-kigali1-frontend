import {
  NEW_ARTICLE,
  ARTICLE_ERROR,
  SUBMITTING_ARTICLE,
  FETCH_ARTICLE_TO_EDIT,
  ARTICLE_UPDATED,
  CLEAR_RESPONSE
} from "../actionTypes";

const initialState = {
  article: {
    title: "",
    body: "",
    description: "",
    tagsList: []
  }
};

const createArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ARTICLE:
      return {
        ...state,
        article: { ...state.article, ...action.payload.article },
        message: action.payload.message,
        response: action.payload.article,
        isSubmitting: false
      };
    case ARTICLE_UPDATED:
      return {
        ...state,
        article: { ...state.article, ...action.payload.article },
        message: action.payload.message,
        response: action.payload.article,
        isSubmitting: false
      };

    case ARTICLE_ERROR:
      return {
        ...state,
        articleError: action.payload,
        isSubmitting: false
      };
    case SUBMITTING_ARTICLE:
      return {
        ...state,
        isSubmitting: true
      };
    case CLEAR_RESPONSE:
      return {
        ...state,
        message: null,
        articleError: null,
        response: null
      };
    case FETCH_ARTICLE_TO_EDIT:
      return {
        ...state,
        article: { ...state.article, ...action.payload.article }
      };
    default:
      return {
        ...state
      };
  }
};

export default createArticleReducer;
