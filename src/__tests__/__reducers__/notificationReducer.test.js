import notificationReducer, {
  initialState
} from "../../redux/reducers/notificationReducer";
import {
  NOTIFICATION_FAILED,
  NOTIFICATION_SUCCESS,
  FETCHING_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../../redux/actionTypes";

const notifications = [
  { id: "ds", ref: "dfrdghfn", message: "fdegdjbsfgsiudgiudsfh" },
  { id: "ds", ref: "dfrdghfn", message: "fdegdjbsfgsiudgiudsfh" },
  { id: "ds", ref: "dfrdghfn", message: "fdegdjbsfgsiudgiudsfh" }
];
const errorMessage = "There are no notifiactions";

describe("Notification reducers", () => {
  it("should return initial state", () => {
    expect(notificationReducer(undefined, {})).toEqual({
      ...initialState
    });
  });
  it("should handle FETCHING", () => {
    expect(
      notificationReducer(initialState, { type: FETCHING_NOTIFICATION })
    ).toEqual({
      ...initialState,
      isFetching: true
    });
  });
  it("should handle FETCHING SUCCESS", () => {
    expect(
      notificationReducer(initialState, {
        type: NOTIFICATION_SUCCESS,
        payload: notifications
      })
    ).toEqual({ ...initialState, notifications });
  });

  it("should handle FETCHING_NOTIFICATION FAILED", () => {
    expect(
      notificationReducer(initialState, {
        type: NOTIFICATION_FAILED,
        payload: errorMessage
      })
    ).toEqual({ ...initialState, errorMessage });
  });

  it("should handle DELETING NOTIFICATION", () => {
    expect(
      notificationReducer(
        { ...initialState, notifications },
        {
          type: DELETE_NOTIFICATION,
          payload: notifications[0].id
        }
      )
    ).toEqual({
      ...initialState,
      notifications: notifications.filter(not => not.id !== notifications[0].id)
    });
  });
});
