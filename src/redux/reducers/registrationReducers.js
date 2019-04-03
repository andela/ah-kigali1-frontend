import {
  REGISTER_REQUEST_SUCCEEDED,
  REGISTER_REQUEST_FAILED,
  REGISTER_REQUESTED,
  REGISTER_INPUT_CHANGE,
  REGISTER_VALIDATE_INPUT
} from "../actionTypes";

export const initialState = {
  user: {
    email: "",
    username: "",
    password: ""
  },
  submitted: false,
  message: "",
  success: false
};
const registration = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUESTED:
      return {
        ...state,
        submitted: true,
        message: "registration started"
      };
    case REGISTER_REQUEST_SUCCEEDED:
      return {
        ...initialState,
        submitted: false,
        user: action.payload.user,
        message: action.payload.message,
        success: true
      };
    case REGISTER_REQUEST_FAILED:
      return {
        ...state,
        submitted: false,
        message: action.message
      };
    case REGISTER_INPUT_CHANGE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        message: ""
      };
    case REGISTER_VALIDATE_INPUT:
      return {
        ...state,
        submitted: false,
        message: action.message
      };
    default:
      return state;
  }
};

export default registration;
