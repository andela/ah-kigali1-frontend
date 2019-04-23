import "@babel/polyfill";
import {
  RESET_PASSWORD_INPUT_CHANGE,
  SENDING_RESET_PASSWORD_LINK,
  RESET_PASSWORD_LINK_FAILED,
  RESET_PASSWORD_LINK_SUCCESS
} from "../actionTypes";

export const INITIAL_STATE = {
  email: "",
  isSubmitting: false,
  failedMessage: "",
  successMessage: "",
  isSuccess: null
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_PASSWORD_INPUT_CHANGE:
      return {
        ...state,
        failedMessage: "",
        [payload.name]: payload.value
      };
    case SENDING_RESET_PASSWORD_LINK:
      return {
        ...state,
        isSubmitting: true,
        failedMessage: ""
      };
    case RESET_PASSWORD_LINK_FAILED:
      return {
        ...state,
        failedMessage: payload.message,
        isSuccess: false,
        isSubmitting: false
      };
    case RESET_PASSWORD_LINK_SUCCESS:
      return {
        ...state,
        successMessage: payload.message,
        isSuccess: true,
        isSubmitting: false
      };
    default:
      return state;
  }
};
