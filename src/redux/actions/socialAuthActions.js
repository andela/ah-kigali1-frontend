import "@babel/polyfill";
import dotenv from "dotenv";
import axios from "../../utils/axios";
import {
  SUBMITTING_SOCIAL_AUTH,
  SOCIAL_AUTH_SUCCESS,
  SOCIAL_AUTH_FAILED
} from "../actionTypes";

dotenv.config();
export const handleUserLogin = token => async dispatch => {
  dispatch({
    type: SUBMITTING_SOCIAL_AUTH
  });
  try {
    const response = await axios.get("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.data) {
      await localStorage.setItem("token", token);
      return dispatch({
        type: SOCIAL_AUTH_SUCCESS
      });
    }
    // eslint-disable-next-line no-throw-literal
    throw "Invalid token";
  } catch (error) {
    dispatch({
      type: SOCIAL_AUTH_FAILED,
      payload: { message: "Login failed please try again!" }
    });
  }
};
