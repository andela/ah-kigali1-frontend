import axios from "axios";
import {
  RESET_PASSWORD_INPUT_CHANGE,
  SENDING_RESET_PASSWORD_LINK,
  RESET_PASSWORD_LINK_SUCCESS,
  RESET_PASSWORD_LINK_FAILED
} from "../actionTypes";

const BASE_URL = "http://localhost:3000/api/v1";
export const handleInputChange = (name, value) => ({
  type: RESET_PASSWORD_INPUT_CHANGE,
  payload: { name, value }
});

export const sendResetLink = ({ email }) => async dispatch => {
  try {
    dispatch({
      type: SENDING_RESET_PASSWORD_LINK
    });
    const response = await axios.post(`${BASE_URL}/users/reset_password`, {
      email
    });
    const { message } = response.data;
    dispatch({
      type: RESET_PASSWORD_LINK_SUCCESS,
      payload: {
        message
      }
    });
  } catch (error) {
    const {
      data: { message }
    } = error.response;
    dispatch({
      type: RESET_PASSWORD_LINK_FAILED,
      payload: { message }
    });
  }
};
