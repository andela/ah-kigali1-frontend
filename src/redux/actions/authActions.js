import "@babel/polyfill";
import jwt from "jsonwebtoken";
import axios, { baseURL } from "../../utils/axios";
import {
  LOGIN_INPUT_CHANGE,
  SUBMITTING_LOGIN_CREDENTIALS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  IS_OPENING_SOCIAL_AUTH_PROVIDER,
  CANCEL_SOCIAL_AUTH,
  SET_CURRENT_USER
} from "../actionTypes";

export const handleTextInput = (name, value) => ({
  type: LOGIN_INPUT_CHANGE,
  payload: { name, value }
});

const updateIsSubmitting = () => ({
  type: SUBMITTING_LOGIN_CREDENTIALS
});

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

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  payload: user
});

export const handleSignIn = ({ email, password }) => async dispatch => {
  try {
    dispatch(updateIsSubmitting());
    const response = await axios.post("/users/login", {
      email,
      password
    });
    const { token, message } = response.data;
    dispatch(loginSuccess({ token, message }));
    await localStorage.setItem("token", token);
    dispatch(setCurrentUser(jwt.decode(token)));
  } catch (error) {
    const { message, errors = {} } = error.response.data;
    dispatch(loginFailed({ message, errors }));
  }
};

export const socialAuth = provider => async dispatch => {
  try {
    dispatch({
      type: IS_OPENING_SOCIAL_AUTH_PROVIDER
    });
    await window.open(`${baseURL}/auth/${provider}`, "_top");
  } catch (error) {
    dispatch({
      type: CANCEL_SOCIAL_AUTH
    });
  }
};
