import reducer from "../../redux/reducers/createArticleReducer";
import {
  NEW_ARTICLE,
  INPUT_CHANGE,
  SUBMITTING_ARTICLE,
  FETCH_ARTICLE_TO_EDIT,
  ARTICLE_UPDATED,
  ARTICLE_ERROR,
  REMOVE_TAG,
  NEW_TAG
} from "../../redux/actionTypes";

describe("article reducer", () => {
  test("should return the initial state on no action", () => {
    expect(reducer(undefined, {})).toEqual({
      title: "",
      description: "",
      tagsList: [],
      body: ""
    });
  });

  test("should return the initial state on wrong action", () => {
    expect(
      reducer(undefined, { type: "ADD TITLE", payload: "hello world" })
    ).toEqual({
      title: "",
      description: "",
      body: "",
      tagsList: []
    });
  });

  test("should handle on input change", () => {
    expect(
      reducer(
        {},
        {
          type: INPUT_CHANGE,
          payload: {
            field: "title",
            value: "Hello world"
          }
        }
      )
    ).toEqual({ title: "Hello world" });
  });

  test("should handle new article action", () => {
    expect(reducer({}, { type: NEW_ARTICLE, payload: "hello world" })).toEqual({
      response: "hello world"
    });
  });

  test("should handle article error ", () => {
    expect(
      reducer({}, { type: ARTICLE_ERROR, payload: "hello world" })
    ).toEqual({
      isSubmitting: false,
      article_error: "hello world"
    });
  });

  test("should handle submitting action ", () => {
    expect(reducer({}, { type: SUBMITTING_ARTICLE })).toEqual({
      isSubmitting: true
    });
  });

  test("should handle adding tag ", () => {
    expect(
      reducer({ tagsList: [] }, { type: NEW_TAG, payload: "hello world" })
    ).toEqual({
      tagsList: ["hello world"]
    });
  });

  test("should handle removing a tag ", () => {
    expect(
      reducer(
        { tagsList: ["hello world"] },
        { type: REMOVE_TAG, payload: "hello world" }
      )
    ).toEqual({
      tagsList: []
    });
  });

  test("should handle fetching article to edit ", () => {
    expect(
      reducer(
        {},
        {
          type: FETCH_ARTICLE_TO_EDIT,
          payload: {
            article: {
              title: "hello world"
            }
          }
        }
      )
    ).toEqual({
      title: "hello world"
    });
  });

  test("should handle article updated successfully ", () => {
    expect(
      reducer(
        {},
        {
          type: ARTICLE_UPDATED,
          payload: "Article updated successfully"
        }
      )
    ).toEqual({
      response: "Article updated successfully"
    });
  });
});
