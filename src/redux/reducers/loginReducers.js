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
  successMessage: null,
  token: null
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_INPUT_CHANGE:
      return {
        ...state,
        [payload.name]: payload.value
      };
    case SUBMITTING_LOGIN_CREDENTIALS:
      return {
        ...state,
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
        successMessage: payload.message
      };
    default:
      return state;
  }
};
