import {
  LOGIN_INPUT_CHANGE,
  SUBMITTING_LOGIN_CREDENTIALS,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from "../actionTypes";

export const INITIAL_STATE = {
  isSubmitting: false,
  email: "",
  password: "",
  errors: {},
  loginSuccess: null,
  token: null
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
    default:
      return state;
  }
};
