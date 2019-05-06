import userReducer from "../../redux/reducers/userReducer";
import {
  SET_PROFILE,
  SET_LOADING,
  SET_ERROR,
  SET_FORM_INPUT,
  SET_SUCCESS,
  SET_IMAGE,
  SET_INPUT,
  CLEAR_MESSAGE
} from "../../redux/actionTypes";
import { INITIAL_STATE } from "../testData";

const testInput = { field: "email", value: "test@test.com" };
const testInputImage = { image: "https://picsum.photos/200/300" };
describe("team reducer", () => {
  test("should handle SET_LOADING", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: SET_LOADING,
        payload: true
      })
    ).toEqual({
      ...INITIAL_STATE,
      loading: true
    });
  });

  test("should handle SET_ERROR", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: SET_ERROR,
        payload: "Database Error"
      })
    ).toEqual({
      ...INITIAL_STATE,
      error: "Database Error"
    });
  });

  test("should handle SET_SUCCESS", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: SET_SUCCESS,
        payload: "User profile updated successfully"
      })
    ).toEqual({
      ...INITIAL_STATE,
      message: "User profile updated successfully"
    });
  });

  test("should handle SET_PROFILE", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: SET_PROFILE,
        payload: {}
      })
    ).toEqual({
      ...INITIAL_STATE,
      profile: {}
    });
  });

  test("should handle SET_FORM_INPUT", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: SET_FORM_INPUT,
        payload: { ...testInput }
      })
    ).toEqual({
      ...INITIAL_STATE,
      profile: { ...INITIAL_STATE.profile, [testInput.field]: testInput.value }
    });
  });

  test("should handle SET_INPUT", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: SET_INPUT,
        payload: { ...testInput }
      })
    ).toEqual({
      ...INITIAL_STATE,
      [testInput.field]: testInput.value
    });
  });

  test("should handle CLEAR_MESSAGE", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: CLEAR_MESSAGE,
        payload: { ...testInput }
      })
    ).toEqual({
      ...INITIAL_STATE,
      [testInput.field]: testInput.value
    });
  });

  test("should handle SET_IMAGE", () => {
    expect(
      userReducer(INITIAL_STATE, {
        type: SET_IMAGE,
        payload: testInputImage
      })
    ).toEqual({
      ...INITIAL_STATE,
      profile: {
        ...INITIAL_STATE.profile,
        image: testInputImage
      }
    });
  });
});
