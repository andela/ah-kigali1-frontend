import * as actionsTypes from "../actionTypes";
import validator from "../../utils/validator";
import axios from "../../utils/axios";

export const success = payload => ({
  type: actionsTypes.REGISTER_REQUEST_SUCCEEDED,
  payload
});

export const failure = message => ({
  type: actionsTypes.REGISTER_REQUEST_FAILED,
  message
});

export const loading = () => ({ type: actionsTypes.REGISTER_REQUEST_LOADING });

export const requested = user => ({
  type: actionsTypes.REGISTER_REQUESTED,
  user
});

export const InputChange = (name, value) => ({
  type: actionsTypes.REGISTER_INPUT_CHANGE,
  payload: { [name]: value }
});

export const validateInput = message => ({
  type: actionsTypes.REGISTER_VALIDATE_INPUT,
  message
});

export const handleRegistration = user => async dispatch => {
  try {
    dispatch(requested(user));
    const response = await axios.post("/users", {
      ...user
    });
    const { user: registeredUser, message } = response.data;
    await localStorage.setItem("user", JSON.stringify(registeredUser));
    dispatch(success({ user: registeredUser, message }));
  } catch (error) {
    const { message } = error.response.data;
    dispatch(failure(message));
  }
};

export const handleInputChange = (input, value) => dispatch => {
  dispatch(InputChange(input, value));
};

export const handleBlur = (input, value) => {
  let message = "";
  switch (input) {
    case "email":
      if (validator.isEmailValid(value)) {
        message = "";
      } else {
        message = "Invalid email";
      }
      break;
    case "password":
      if (validator.isPasswordValid(value)) {
        message = "";
      } else {
        message =
          "The password should be an alphanumeric with at least 8 characters.";
      }
      break;
    case "username":
      if (validator.isUsernameValid(value)) {
        message = "";
      } else {
        message = "Invalid username";
      }
      break;
    default:
      message = "";
      break;
  }
  return dispatch => {
    dispatch(validateInput(message));
  };
};
