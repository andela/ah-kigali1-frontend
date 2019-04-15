import { UPDATE_PASSWORD_INPUT_CHANGE } from "../actionTypes";

const INITIAL_STATE = {
  isSubmitting: false
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case UPDATE_PASSWORD_INPUT_CHANGE:
      return {
        ...state,
        [payload.field]: payload.value
      };
    default:
      return state;
  }
};
