import {
  SUBMITTING_SOCIAL_AUTH,
  SOCIAL_AUTH_SUCCESS,
  SOCIAL_AUTH_FAILED
} from "../actionTypes";

const INITIAL_STATE = {
  isSubmitting: true,
  socialAuthSuccess: false,
  socialAuthFailed: false
};

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case SUBMITTING_SOCIAL_AUTH:
      return {
        ...state,
        isSubmitting: true
      };
    case SOCIAL_AUTH_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        socialAuthSuccess: true
      };
    case SOCIAL_AUTH_FAILED:
      return {
        ...state,
        isSubmitting: false,
        socialAuthFailed: true
      };
    default:
      return state;
  }
};
