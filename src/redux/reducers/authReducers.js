import {
  LOGIN_INPUT_CHANGE,
  SUBMITTING_LOGIN_CREDENTIALS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  IS_OPENING_SOCIAL_AUTH_PROVIDER,
  CANCEL_SOCIAL_AUTH,
  SET_CURRENT_USER
} from "../actionTypes";

export const INITIAL_STATE = {
  isSubmitting: false,
  email: "",
  password: "",
  errors: {},
  loginSuccess: null,
  token: null,
  currentUser: null
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_INPUT_CHANGE:
      return {
        ...state,
        errors: {},
        [payload.name]: payload.value
      };
    case SUBMITTING_LOGIN_CREDENTIALS:
      return {
        ...state,
        errors: {},
        isSubmitting: true
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isSubmitting: false,
        errors: {
          ...state.errors,
          ...payload.errors,
          message: payload.message
        }
      };
    case LOGIN_SUCCESS:
      return {
        ...INITIAL_STATE,
        token: payload.token,
        loginSuccess: true
      };
    case IS_OPENING_SOCIAL_AUTH_PROVIDER:
      return {
        ...INITIAL_STATE,
        isSubmitting: true
      };
    case CANCEL_SOCIAL_AUTH:
      return {
        ...INITIAL_STATE,
        isSubmitting: false
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      };
    default:
      return state;
  }
};
