import "@babel/polyfill";
import axios from "../../utils/axios";
import {
  NOTIFICATION_FAILED,
  NOTIFICATION_SUCCESS,
  FETCHING_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../actionTypes";

export const success = data => {
  const { notifications } = data;
  return { type: NOTIFICATION_SUCCESS, payload: notifications };
};

export const failed = error => {
  const { message: errorMessage } = error;
  return { type: NOTIFICATION_FAILED, payload: errorMessage };
};

export const removeNotificatation = id => ({
  type: DELETE_NOTIFICATION,
  payload: id
});

export const fetchNotifications = () => async dispatch => {
  try {
    dispatch({ type: FETCHING_NOTIFICATION });
    const { data } = await axios.get("/users/notifications?status=unread");
    dispatch(success(data.user));
  } catch (error) {
    const { data: err } = error.response;
    dispatch(failed(err));
  }
};

export const deleteNotification = notifId => async dispatch => {
  try {
    dispatch({ type: FETCHING_NOTIFICATION });
    const { status, data } = await axios.delete(
      `/users/notifications/${notifId}`
    );
    if (status === 200) dispatch(removeNotificatation(notifId));
    else dispatch(failed(data));
  } catch (error) {
    const { data: err } = error.response;
    dispatch(failed(err));
  }
};

export const readNotification = ({ id, ref }, history) => async dispatch => {
  try {
    dispatch({ type: FETCHING_NOTIFICATION });
    const { status, data } = await axios.put(`/users/notifications/${id}`);
    if (status === 201) {
      dispatch(removeNotificatation(id));
      history.push(`/articles/${ref}`);
    } else dispatch(failed(data));
  } catch (error) {
    const { data: err } = error.response;
    dispatch(failed(err));
  }
};
