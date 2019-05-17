import {
  RATING_ARTICLE,
  RATING_FAILURE,
  RATING_SUCCESS,
  RATING_FOUND
} from "../actionTypes";

const initialState = {
  ratingInProgress: false,
  rate: {
    ratings: []
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case RATING_ARTICLE:
      return {
        ...state,
        ratingInProgress: true
      };
    case RATING_SUCCESS:
      return {
        ...state,
        rate: action.payload,
        ratingInProgress: false
      };
    case RATING_FAILURE:
      return {
        ...state,
        rateError: action.payload,
        ratingInProgress: false
      };
    case RATING_FOUND:
      return {
        ...state,
        rate: action.payload,
        ratingInProgress: false
      };
    default:
      return state;
  }
};
