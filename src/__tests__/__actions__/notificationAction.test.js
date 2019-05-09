import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "../../utils/axios";

import {
  fetchNotifications,
  deleteNotification,
  readNotification
} from "../../redux/actions/notificationActions";
import {
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILED,
  FETCHING_NOTIFICATION,
  DELETE_NOTIFICATION
} from "../../redux/actionTypes";

const mockStore = configureMockStore([thunk]);
let store;

const notifications = [
  { id: "ds", ref: "dfrdghfn", message: "fdegdjbsfgsiudgiudsfh" },
  { id: "ds", ref: "dfrdghfn", message: "fdegdjbsfgsiudgiudsfh" },
  { id: "ds", ref: "dfrdghfn", message: "fdegdjbsfgsiudgiudsfh" }
];
let errorMessage = null;

describe("test the notification actions", () => {
  beforeEach(() => {
    moxios.install(axios);
    store = mockStore({});
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  describe("test fetch notifications", () => {
    test("should dispatch the success action after successfully fetching the notifications", () => {
      store = mockStore({});
      errorMessage = null;
      const expectedActions = [
        { type: FETCHING_NOTIFICATION },
        { type: NOTIFICATION_SUCCESS, payload: notifications }
      ];
      moxios.stubRequest(
        `${process.env.API_URL}/users/notifications?status=unread`,
        {
          status: 200,
          response: { user: { notifications } }
        }
      );
      return store.dispatch(fetchNotifications()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    test("should dispatch the failed action when no notifications are found", () => {
      store = mockStore({});
      errorMessage = "There are no notifiactions";
      const expectedActions = [
        { type: FETCHING_NOTIFICATION },
        { type: NOTIFICATION_FAILED, payload: errorMessage }
      ];
      moxios.stubRequest(
        `${process.env.API_URL}/users/notifications?status=unread`,
        {
          status: 404,
          response: { message: errorMessage }
        }
      );
      return store.dispatch(fetchNotifications()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe("test delete a single notification", () => {
    test("should dispatch the failed action when that notification is not deleted", () => {
      store = mockStore({});
      errorMessage = "There was a problem while deleting the notification";
      const expected = [
        { type: FETCHING_NOTIFICATION },
        { type: NOTIFICATION_FAILED, payload: errorMessage }
      ];
      moxios.stubRequest(
        `${process.env.API_URL}/users/notifications/${notifications[0].id}`,
        {
          status: 500,
          response: { message: errorMessage }
        }
      );
      return store
        .dispatch(deleteNotification(notifications[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    test("should dispatch the failed action when there was an error deleting the notification", () => {
      store = mockStore({});
      errorMessage = "Invalid request";
      const expected = [
        { type: FETCHING_NOTIFICATION },
        { type: NOTIFICATION_FAILED, payload: errorMessage }
      ];
      moxios.stubRequest(
        `${process.env.API_URL}/users/notifications/${notifications[1].id}`,
        {
          status: 201,
          response: { message: errorMessage }
        }
      );
      return store
        .dispatch(deleteNotification(notifications[1].id))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    test("should dispatch the success action after successfully deleting the notification", () => {
      store = mockStore({});
      errorMessage = null;
      const [, ...newNotifications] = notifications;
      const expectedActions = [
        { type: FETCHING_NOTIFICATION },
        { type: DELETE_NOTIFICATION, payload: notifications[0].id }
      ];
      moxios.stubRequest(
        `${process.env.API_URL}/users/notifications/${notifications[0].id}`,
        {
          status: 200,
          response: { user: { newNotifications } }
        }
      );
      return store
        .dispatch(deleteNotification(notifications[0].id))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe("test read a single notification", () => {
    test("should dispatch the failed action when there was an error reading the notification", () => {
      store = mockStore({});
      errorMessage = "Invalid request";
      const expected = [
        { type: FETCHING_NOTIFICATION },
        { type: NOTIFICATION_FAILED, payload: errorMessage }
      ];
      moxios.stubRequest(
        `${process.env.API_URL}/users/notifications/${notifications[1].id}d`,
        {
          status: 400,
          response: { message: errorMessage }
        }
      );
      return store
        .dispatch(readNotification({ id: `${notifications[1].id}d` }))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    test("should dispatch the failed action when there was an error reading the notification", () => {
      store = mockStore({});
      errorMessage = "Invalid request";
      const expected = [
        { type: FETCHING_NOTIFICATION },
        { type: NOTIFICATION_FAILED, payload: errorMessage }
      ];
      moxios.stubRequest(
        `${process.env.API_URL}/users/notifications/${notifications[1].id}`,
        {
          status: 200,
          response: { message: errorMessage }
        }
      );
      return store.dispatch(readNotification(notifications[1])).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    test("should dispatch the success action after successfully reading the notification", () => {
      store = mockStore({});
      errorMessage = null;
      const expectedActions = [
        { type: FETCHING_NOTIFICATION },
        { type: DELETE_NOTIFICATION, payload: notifications[0].id }
      ];
      moxios.stubRequest(
        `${process.env.API_URL}/users/notifications/${notifications[0].id}`,
        {
          status: 201,
          response: {
            user: {
              notifications: notifications.filter(
                not => not !== notifications[0].id
              )
            }
          }
        }
      );
      const history = {
        push: jest.fn()
      };
      return store
        .dispatch(readNotification({ id: notifications[0].id }, history))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          expect(history.push).toHaveBeenCalled();
        });
    });
  });
});
