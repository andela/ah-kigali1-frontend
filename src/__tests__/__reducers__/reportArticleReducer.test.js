import { reportArticle } from "../../redux/reducers/reportReducer";
import {
  ARTICLE_REPORTED,
  REPORT_ERROR,
  REPORTING_ARTICLE
} from "../../redux/actionTypes";

describe("Report article reducers", () => {
  test("should return the initial state", () => {
    expect(reportArticle(undefined, {})).toEqual({
      response: "",
      reporting: false
    });
  });

  test("should return the reporting true", () => {
    expect(reportArticle(undefined, { type: REPORTING_ARTICLE })).toEqual({
      response: "",
      reporting: true
    });
  });

  test("should return the error response", () => {
    expect(
      reportArticle(undefined, {
        type: REPORT_ERROR,
        payload: "Article not found"
      })
    ).toEqual({
      response: "Article not found",
      reporting: false
    });
  });

  test("should return the response article reported", () => {
    expect(
      reportArticle(undefined, {
        type: ARTICLE_REPORTED,
        payload: "Article reported successfully"
      })
    ).toEqual({
      response: "Article reported successfully",
      reporting: false
    });
  });
});
