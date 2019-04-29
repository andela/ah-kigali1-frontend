import "@babel/polyfill";
import thunk from "redux-thunk";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import dotenv from "dotenv";
import * as actions from "../../redux/actions/registrationActions";
import * as actionTypes from "../../redux/actionTypes";
import axios from "../../utils/axios";

dotenv.config();

const dummyUser = {
  email: "test@test.com",
  username: "test",
  password: "9874",
  confirmPassword: "9874"
};

const initialState = {
  user: {
    email: "",
    username: "",
    password: ""
  },
  submitted: false,
  message: "",
  success: false
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("test actions ", () => {
  test("should create an action to request authentication", () => {
    const expectedAction = {
      type: actionTypes.REGISTER_REQUESTED,
      user: dummyUser
    };
    expect(actions.requested(dummyUser)).toEqual(expectedAction);
  });

  test("should create an action for loading", () => {
    const expectedAction = {
      type: actionTypes.REGISTER_REQUEST_LOADING
    };
    expect(actions.loading()).toEqual(expectedAction);
  });

  test("should create an action for a successful", () => {
    const expectedAction = {
      type: actionTypes.REGISTER_REQUEST_SUCCEEDED,
      payload: dummyUser
    };
    expect(actions.success(dummyUser)).toEqual(expectedAction);
  });

  test("should create an action for failure ", () => {
    const message = "Invalid email";
    const expectedAction = {
      type: actionTypes.REGISTER_REQUEST_FAILED,
      message
    };
    expect(actions.failure(message)).toEqual(expectedAction);
  });

  test("should return an action on input change", () => {
    const field = "email";
    const value = "esp.com";
    const expectedAction = {
      type: actionTypes.REGISTER_INPUT_CHANGE,
      payload: { [field]: value }
    };
    expect(actions.InputChange(field, value)).toEqual(expectedAction);
  });

  test("should return an action on blur", () => {
    Array.of("email", "password", "usermane").forEach(field => {
      let message;
      if (field === "password") {
        message =
          "The password should be an alphanumeric with at least 8 characters lower and upper cases";
      } else {
        message = `Invalid ${field}`;
      }

      const expectedAction = {
        type: actionTypes.REGISTER_VALIDATE_INPUT,
        message
      };
      expect(actions.validateInput(message)).toEqual(expectedAction);
    });
  });
});

describe("test action creators", () => {
  beforeEach(() => {
    moxios.install(axios);
  });
  afterEach(() => {
    moxios.uninstall(axios);
  });

  test("fetch successful post to user api call", () => {
    moxios.stubRequest(`${process.env.API_URL}/users`, {
      status: 200,
      response: {
        data: {
          user: dummyUser,
          message: "done done"
        }
      }
    });
    const expectedActions = [
      {
        type: actionTypes.REGISTER_REQUESTED,
        user: dummyUser
      },
      {
        type: actionTypes.REGISTER_REQUEST_SUCCEEDED,
        payload: dummyUser
      }
    ];

    const store = mockStore({ ...initialState });
    store.dispatch(actions.handleRegistration(dummyUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test("test a when registration fails", () => {
    const message = "Invalid email";
    const expectedActions = [
      {
        type: actionTypes.REGISTER_REQUESTED,
        user: dummyUser
      },
      {
        type: actionTypes.REGISTER_REQUEST_FAILED,
        message
      }
    ];
    const payload = "An error occurs";
    moxios.stubRequest(`${process.env.API_URL}/users`, {
      status: 500,
      response: {
        data: { message: payload }
      }
    });
    const store = mockStore({ ...initialState });
    store.dispatch(actions.handleRegistration(dummyUser)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe("test events", () => {
    test("mock handle input change", () => {
      const field = "email";
      const value = "esp.com";
      const expectedAction = [
        {
          type: actionTypes.REGISTER_INPUT_CHANGE,
          payload: { [field]: value }
        }
      ];
      const store = mockStore({ ...initialState });
      store.dispatch(actions.handleInputChange(field, value));
      expect(store.getActions()).toEqual(expectedAction);
    });

    test("mock handle blur", () => {
      Array.of("email", "password", "username").forEach(field => {
        let message;
        if (field === "password") {
          message =
            "The password should be an alphanumeric with at least 8 characters.";
        } else {
          message = `Invalid ${field}`;
        }
        const expectedAction = [
          {
            type: actionTypes.REGISTER_VALIDATE_INPUT,
            message
          }
        ];
        const store = mockStore({ ...initialState });
        store.dispatch(actions.handleBlur(field, ""));
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
