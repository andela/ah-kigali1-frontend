import {
  SET_HIGHLIGHTED_SECTION,
  RESET_ARTICLE_HIGHLIGHT,
  SET_HIGHLIGHTS
} from "../../redux/actionTypes";
import highlightReducers from "../../redux/reducers/highlightReducers";
import { arrayToObject } from "../../utils/helperFunctions";
import { highlights } from "../__mocks__/testData";

const highlightsOb = arrayToObject(highlights, "id");

const INITIAL_STATE = {
  start: null,
  end: null,
  comment: "",
  articleHighlights: {}
};
describe("Highlight reducers", () => {
  test("should return initial state", () => {
    expect(highlightReducers(undefined, {})).toEqual({ ...INITIAL_STATE });
  });
  test("should set highlights", () => {
    expect(
      highlightReducers(INITIAL_STATE, {
        type: SET_HIGHLIGHTS,
        payload: highlightsOb
      })
    ).toEqual({ ...INITIAL_STATE, articleHighlights: { ...highlightsOb } });
  });
  test("should reset some of article highlights attributes", () => {
    expect(
      highlightReducers(INITIAL_STATE, { type: RESET_ARTICLE_HIGHLIGHT })
    ).toEqual({ ...INITIAL_STATE });
  });
  test("should set start and end of highlighted text", () => {
    expect(
      highlightReducers(INITIAL_STATE, {
        type: SET_HIGHLIGHTED_SECTION,
        payload: { start: 2, end: 20 }
      })
    ).toEqual({ ...INITIAL_STATE, start: 2, end: 20 });
  });
});
