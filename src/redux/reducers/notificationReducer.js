import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILED,
  FETCHING_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../actionTypes";

export const initialState = {
  isFetching: false,
  errorMessage: null,
  notifications: []
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  const { notifications } = state;
  const newNotifications = notifications.filter(
    not => not && not.id !== payload
  );
  switch (type) {
    case FETCHING_NOTIFICATION:
      return {
        ...state,
        isFetching: true
      };
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: payload
      };

    case DELETE_NOTIFICATION:
      return {
        ...state,
        isFetching: false,
        notifications: newNotifications
      };
    case NOTIFICATION_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload
      };
    default:
      return state;
  }
};
