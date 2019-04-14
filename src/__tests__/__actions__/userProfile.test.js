import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import nock from "nock";
import { INITIAL_STATE } from "../testData";
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

const { API_URL = "http://localhost:3000/api/v1" } = process.env;
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
      store = mockStore({});
    });
    afterEach(() => {
      nock.cleanAll();
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
        nock(API_URL)
          .get("/profiles")
          .reply(200, {
            email: "admin@email.com"
          });
        return store
          .dispatch(fetchCurrentUser("username", payload))
          .then(() => {
            const actions = store.getActions();
            expect(typeof actions[1]).toEqual("object");
            expect(Array.isArray(actions)).toBe(true);
          });
      });
      test("should return error message", () => {
        const payload = {
          user: {
            address: "Rwanda-Kigali",
            bio:
              "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
            email: "admin@email.com",
            firstName: "Fabrice",
            lastName: "NIYOMWUNGERI",
            phone: "0786993847"
          }
        };
        nock(API_URL)
          .get("/profiles")
          .reply(404, {
            message: "No user with that name"
          });
        return store
          .dispatch(fetchCurrentUser("usernamee", payload))
          .then(() => {
            const actions = store.getActions();
            expect(typeof actions[1]).toEqual("object");
            expect(actions[1].payload).toEqual("No user with that name");
          });
      });
    });
    describe("saveUpdatedUser()", () => {
      test("should updated user successfully", () => {
        const payload = {
          address: "Rwanda-Kigali",
          bio:
            "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
          email: "admin@email.com",
          firstName: "Fabrice",
          lastName: "NIYOMWUNGERI",
          phone: "0786993847"
        };
        nock(API_URL)
          .put("/profiles")
          .reply(200, {
            status: 200,
            user: {
              token: "4777vvcvhe7e77vb"
            }
          });
        return store.dispatch(saveUpdatedUser(payload, "username")).then(() => {
          const actions = store.getActions();
          expect(Array.isArray(actions)).toBe(true);
          expect(actions[1].payload).toEqual("Profile updated successfully");
        });
      });
      test("should fail to update user information", () => {
        const payload = {
          address: "Rwanda-Kigali",
          bio:
            "Lorem Ipsum is simply dummy text of the printing and typesetting indus",
          email: "admin@email.com",
          firstName: "Fabrice",
          lastName: "NIYOMWUNGERI",
          phone: "0786993847"
        };
        nock(API_URL)
          .put("/profiles")
          .reply(200, {
            status: 200,
            user: {
              token: "4777vvcvhe7e77vb"
            }
          });
        return store
          .dispatch(saveUpdatedUser(payload, "usernamee"))
          .then(() => {
            const actions = store.getActions();
            expect(actions[0].payload).toEqual("Not authorized");
          });
      });
    });
    describe("uploadImage()", () => {
      // test("should upload image successfully", () => {
      //   const file = {
      //     File: {
      //       lastModified: 1547533967696,
      //       name: "Photo-Passport3-black.jpg",
      //       size: 89373,
      //       type: "image/jpeg",
      //       webkitRelativePath: ""
      //     }
      //   };
      //   const fd = new FormData();
      //   fd.append("upload_preset", "m2zsnlpc");
      //   fd.append("file", file);
      //   nock("https://api.cloudinary.com/v1_1/dtzujn9pi/upload", fd, {
      //     headers: { "X-Requested-With": "XMLHttpRequest" }
      //   })
      //     .persist()
      //     .post("")
      //     .reply(200, { status: 200 });
      //   return store.dispatch(uploadImage(file)).then(() => {
      //     const actions = store.getActions();

      //     // expect(Array.isArray(actions)).toBe(true);
      //   });
      // });
    });
  });
});
