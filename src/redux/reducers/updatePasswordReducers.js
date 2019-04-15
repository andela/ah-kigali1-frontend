import {
  UPDATE_PASSWORD_INPUT_CHANGE,
  UPDATING_PASSWORD,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILED
} from "../actionTypes";

const INITIAL_STATE = {
  isSubmitting: false,
  errors: {}
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case UPDATE_PASSWORD_INPUT_CHANGE:
      return {
        ...state,
        [payload.field]: payload.value
      };
    case UPDATING_PASSWORD:
      return {
        ...state,
        isSubmitting: true
      };
    case PASSWORD_UPDATE_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        message: payload.message
      };
    case PASSWORD_UPDATE_FAILED:
      return {
        ...state,
        isSubmitting: false,
        errors: {
          ...payload.errors,
          message: payload.message
        }
      };
    default:
      return state;
  }
};
