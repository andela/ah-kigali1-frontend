import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import moxios from "moxios";
import { INITIAL_STATE } from "../testData";
import "isomorphic-fetch";
import {
  setCurrentUser,
  setError,
  setImage,
  setLoading,
  setSuccess,
  fetchCurrentUser,
  saveUpdatedUser,
  uploadImage
} from "../../redux/actions/index";
import {
  SET_ERROR,
  SET_IMAGE,
  SET_LOADING,
  SET_PROFILE,
  SET_SUCCESS
} from "../../redux/actionTypes";

const { API_URL, CLOUDINARY_URL, CLOUD_NAME } = process.env;
const mockStore = configureStore([thunk]);
let store;
describe("profile actions", () => {
  describe("setCurrentUser()", () => {
    test("should create an action setCurrentUser ", () => {
      const expectedAction = {
        type: SET_PROFILE,
        payload: { ...INITIAL_STATE.profile }
      };
      expect(setCurrentUser({ ...INITIAL_STATE.profile })).toEqual(
        expectedAction
      );
    });
  });
  describe("setImage()", () => {
    test("should create an action setImage ", () => {
      const expectedAction = {
        type: SET_IMAGE,
        payload: { ...INITIAL_STATE.profile.image }
      };
      expect(setImage({ ...INITIAL_STATE.profile.image })).toEqual(
        expectedAction
      );
    });
  });
  describe("setLoading()", () => {
    test("should create an action setLoading ", () => {
      const expectedAction = {
        type: SET_LOADING,
        payload: true
      };
      expect(setLoading(true)).toEqual(expectedAction);
    });
  });
  describe("setSuccess", () => {
    test("should create an action setSuccess ", () => {
      const expectedAction = {
        type: SET_SUCCESS,
        payload: "Profile has been updated successfully"
      };
      expect(setSuccess("Profile has been updated successfully")).toEqual(
        expectedAction
      );
    });
  });
  describe("setError", () => {
    test("should create an action setError ", () => {
      const expectedAction = {
        type: SET_ERROR,
        payload: "Error has occurred"
      };
      expect(setError("Error has occurred")).toEqual(expectedAction);
    });
  });
  describe("async function", () => {
    beforeEach(() => {
      moxios.install();
      store = mockStore({});
    });
    afterEach(() => {
      moxios.uninstall();
    });
    describe("fetchCurrentUser()", () => {
      test("should return successful message", () => {
        const payload = {
          user: {
            address: "Rwanda-Kigali",
            bio:
              "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
            email: "admin@email.com",
            firstName: "Fabrice",
            lastName: "NIYOMWUNGERI",
            phone: "0786993847",
            username: "username"
          }
        };
        const expectedActions = [
          {
            type: SET_LOADING,
            payload: true
          },
          {
            type: SET_PROFILE,
            payload: payload.user
          },
          {
            type: SET_LOADING,
            payload: false
          }
        ];
        moxios.stubRequest(`${API_URL}/profiles/username`, {
          status: 200,
          response: {
            profile: { ...payload.user }
          }
        });
        return store.dispatch(fetchCurrentUser("username")).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
        });
      });
      test("should return error message", () => {
        const expectedResults = [
          { type: SET_LOADING, payload: true },
          { type: SET_ERROR, payload: "No user with that name" },
          { type: SET_LOADING, payload: false }
        ];
        moxios.stubRequest(`${API_URL}/profiles/usernamee`, {
          status: 404,
          response: {
            message: "No user with that name"
          }
        });
        return store.dispatch(fetchCurrentUser("usernamee")).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedResults);
        });
      });
    });
    describe("saveUpdatedUser()", () => {
      test("should updated user successfully", () => {
        const expectedResults = [
          {
            type: SET_PROFILE,
            payload: {
              address: "Rwanda-Kigali",
              bio:
                "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
              email: "admin@email.com",
              firstName: "Fabrice",
              lastName: "NIYOMWUNGERI",
              phone: "0786993847",
              username: "username"
            }
          },
          { type: SET_SUCCESS, payload: "Profile updated successfully" }
        ];
        const payload = {
          address: "Rwanda-Kigali",
          bio:
            "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
          email: "admin@email.com",
          firstName: "Fabrice",
          lastName: "NIYOMWUNGERI",
          phone: "0786993847",
          username: "username"
        };
        moxios.stubRequest(`${API_URL}/profiles/username`, {
          response: {
            profile: payload,
            message: "Profile updated successfully"
          }
        });
        return store.dispatch(saveUpdatedUser(payload, "username")).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedResults);
          expect(Array.isArray(actions)).toBe(true);
          expect(actions[1].payload).toEqual("Profile updated successfully");
        });
      });
      test("should fail to update", () => {
        const expectedResults = [
          { type: "SET_ERROR", payload: "Not authorized" }
        ];
        const payload = {
          address: "Rwanda-Kigali",
          bio:
            "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
          email: "admin@email.com",
          firstName: "Fabrice",
          lastName: "NIYOMWUNGERI",
          phone: "0786993847",
          username: "username"
        };
        moxios.stubRequest(`${API_URL}/profiles/usernamee`, {
          status: 403,
          response: {
            error: "Not authorized"
          }
        });
        return store
          .dispatch(saveUpdatedUser(payload, "usernamee"))
          .then(() => {
            const actions = store.getActions();
            expect(actions).toEqual(expectedResults);
            expect(Array.isArray(actions)).toBe(true);
            expect(actions[0].payload).toEqual("Not authorized");
          });
      });
    });
    describe("uploadImage()", () => {
      test("should upload image successfully", () => {
        const file = {
          File: {
            lastModified: 1547533967696,
            name: "Photo-Passport3-black.jpg",
            size: 89373,
            type: "image/jpeg",
            webkitRelativePath: ""
          }
        };
        const expectedResults = [
          {
            type: "SET_IMAGE",
            payload:
              "https://res.cloudinary.com/dtzujn9pi/image/upload/v1555320676/wo3uptyi8ewtstk7tvne.jpg"
          }
        ];
        nock(CLOUDINARY_URL)
          .post(`/${CLOUD_NAME}/upload`)
          .reply(200, {
            status: 200,
            secure_url:
              "https://res.cloudinary.com/dtzujn9pi/image/upload/v1555320676/wo3uptyi8ewtstk7tvne.jpg"
          });
        return store.dispatch(uploadImage(file)).then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedResults);
        });
      });
      test("should fail to upload image ", () => {
        const file = {
          File: {
            lastModified: 1547533967696,
            name: "Photo-Passport3-black.jpg",
            size: 89373,
            type: "image/jpeg",
            webkitRelativePath: ""
          }
        };
        nock(CLOUDINARY_URL)
          .post(`/${CLOUD_NAME}/uploa`)
          .reply(200, {
            status: 200,
            secure_url:
              "https://res.cloudinary.com/dtzujn9pi/image/upload/v1555320676/wo3uptyi8ewtstk7tvne.jpg"
          });
        return store.dispatch(uploadImage(file)).then(() => {
          const actions = store.getActions();
          console.log(actions);
          expect(actions[0].type).toEqual("SET_ERROR");
        });
      });
    });
  });
});
