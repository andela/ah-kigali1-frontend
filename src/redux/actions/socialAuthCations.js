import { SUBMITTING_SOCIAL_AUTH, SOCIAL_AUTH_SUCCESS } from "../actionTypes";

export const handleUserLogin = token => async dispatch => {
  dispatch({
    type: SUBMITTING_SOCIAL_AUTH
  });
  try {
    await localStorage.setItem("token", token);
    dispatch({
      type: SOCIAL_AUTH_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: SOCIAL_AUTH_SUCCESS
    });
  }
};
