import "@babel/polyfill";

import axios from "axios";
import {
  LOGIN_INPUT_CHANGE,
  SUBMITTING_LOGIN_CREDENTIALS,
  LOGIN_FAILED,
  LOGIN_SUCCESS
} from "../actionTypes";

const BASE_URL = "http://localhost:3000/api/v1";
export const handleTextInput = (field, value) => {
  return {
    type: LOGIN_INPUT_CHANGE,
    payload: { name: field, value }
  };
};

const updateIsSubmitting = () => {
  return {
    type: SUBMITTING_LOGIN_CREDENTIALS
  };
};

const loginSuccess = payload => {
  const { token, message } = payload;
  return {
    type: LOGIN_SUCCESS,
    payload: { token, message }
  };
};

const loginFailed = payload => {
  const { message, errors } = payload;
  return {
    type: LOGIN_FAILED,
    payload: { message, errors }
  };
};

export const handleSignIn = ({ email, password }) => async dispatch => {
  try {
    dispatch(updateIsSubmitting());
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email,
      password
    });
    const { token, message } = response.data;
    await localStorage.setItem("token", token);
    dispatch(loginSuccess({ token, message }));
  } catch (error) {
    const { message, errors = {} } = error.response.data;
    dispatch(loginFailed({ message, errors }));
  }
};
