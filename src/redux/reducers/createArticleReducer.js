import {
  NEW_ARTICLE,
  INPUT_CHANGE,
  ARTICLE_ERROR,
  SUBMITTING_ARTICLE,
  FETCH_ARTICLE_TO_EDIT,
  ARTICLE_UPDATED,
  NEW_TAG,
  REMOVE_TAG
} from "../actionTypes";

const initialState = {
  title: "",
  body: "",
  description: "",
  tagsList: []
};

const createArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_ARTICLE:
      return {
        ...state,
        response: action.payload
      };
    case ARTICLE_UPDATED:
      return {
        ...state,
        response: action.payload
      };
    case INPUT_CHANGE:
      return { ...state, [action.payload.field]: action.payload.value };
    case ARTICLE_ERROR:
      return { ...state, article_error: action.payload, isSubmitting: false };
    case SUBMITTING_ARTICLE:
      return {
        ...state,
        isSubmitting: true
      };
    case NEW_TAG:
      return {
        ...state,
        tagsList: [...state.tagsList, action.payload]
      };
    case REMOVE_TAG:
      return {
        ...state,
        tagsList: state.tagsList.filter(tag => tag !== action.payload)
      };
    case FETCH_ARTICLE_TO_EDIT:
      return {
        ...state,
        ...action.payload.article
      };

    default:
      return {
        ...state
      };
  }
};

export default createArticleReducer;
