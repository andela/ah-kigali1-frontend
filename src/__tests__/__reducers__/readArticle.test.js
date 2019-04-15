import {
  ARTICLE_FETCHED,
  ARTICLE_ERROR,
  FETCHING_ASIDE_ARTICLES,
  DELETE_ARTICLE,
  FETCHING_ARTICLE
} from "../../redux/actionTypes";
import articleReducer from "../../redux/reducers/readArticleReducer";

describe("fetching one article reducer ", () => {
  test("should return the initial state with wrong action", () => {
    expect(articleReducer(undefined, {})).toEqual({
      isFetching: true,
      asideArticles: {}
    });
  });

  test("should return the error message on articleError action", () => {
    expect(
      articleReducer(undefined, {
        type: ARTICLE_ERROR,
        payload: { message: "Error happened" }
      })
    ).toEqual({
      isFetching: false,
      message: "Error happened",
      asideArticles: {}
    });
  });

  test("should return the fetched article", () => {
    expect(
      articleReducer(
        {},
        { type: ARTICLE_FETCHED, payload: { message: "Article found" } }
      )
    ).toEqual({ isFetching: false, message: "Article found" });
  });
  test("should return the fetching article", () => {
    expect(articleReducer({}, { type: FETCHING_ARTICLE })).toEqual({
      isFetching: true
    });
  });
  test("should return the fetching aside articles", () => {
    expect(
      articleReducer(
        {},
        {
          type: FETCHING_ASIDE_ARTICLES,
          payload: { articles: ["hello world", "hello world"] }
        }
      )
    ).toEqual({
      asideArticles: { articles: ["hello world", "hello world"] }
    });
  });
  test("should return deleting an article", () => {
    expect(
      articleReducer(
        {},
        {
          type: DELETE_ARTICLE,
          payload: "Article deleted successfully"
        }
      )
    ).toEqual({
      response: "Article deleted successfully"
    });
  });
});
