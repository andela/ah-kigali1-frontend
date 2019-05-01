import {
  FOLLOWING_FAILED,
  FOLLOWING_SUCCESS,
  WAITING_RESPONSE
} from "../actionTypes";

export const initialState = {
  isFetching: false,
  status: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case WAITING_RESPONSE:
      return {
        ...state,
        isFetching: true
      };
    case FOLLOWING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        status: payload
      };
    case FOLLOWING_FAILED:
      return {
        ...state,
        isFetching: false,
        status: payload
      };
    default:
      return state;
  }
};
