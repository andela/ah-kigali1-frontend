import "@babel/polyfill";
import axios from "../../utils/axios";
import {
  UPDATE_PASSWORD_INPUT_CHANGE,
  UPDATING_PASSWORD,
  PASSWORD_UPDATE_SUCCESS,
  PASSWORD_UPDATE_FAILED
} from "../actionTypes";

export const handleInputChange = (field, value) => ({
  type: UPDATE_PASSWORD_INPUT_CHANGE,
  payload: { field, value }
});

export const handleUpdatePassword = ({ token, password }) => async dispatch => {
  try {
    dispatch({
      type: UPDATING_PASSWORD
    });
    const response = await axios.put(`/users/${token}/password`, {
      password
    });
    const { message } = response.data;
    dispatch({
      type: PASSWORD_UPDATE_SUCCESS,
      payload: { message }
    });
  } catch (error) {
    const { message, errors = {} } = error.response.data;
    dispatch({
      type: PASSWORD_UPDATE_FAILED,
      payload: { message, errors }
    });
  }
};
