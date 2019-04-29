import reducer from "../../redux/reducers/createArticleReducer";
import {
  NEW_ARTICLE,
  SUBMITTING_ARTICLE,
  FETCH_ARTICLE_TO_EDIT,
  ARTICLE_UPDATED,
  ARTICLE_ERROR
} from "../../redux/actionTypes";

describe("article reducer", () => {
  test("should return the initial state on no action", () => {
    expect(reducer(undefined, {})).toEqual({
      article: {
        title: "",
        description: "",
        tagsList: [],
        body: ""
      }
    });
  });

  test("should return the initial state on wrong action", () => {
    expect(
      reducer(undefined, { type: "ADD TITLE", payload: "hello world" })
    ).toEqual({
      article: {
        title: "",
        description: "",
        body: "",
        tagsList: []
      }
    });
  });

  test("should handle new article action", () => {
    expect(
      reducer(
        {},
        {
          type: NEW_ARTICLE,
          payload: {
            message: "article created",
            article: { title: "hello world" }
          }
        }
      )
    ).toEqual({
      article: { title: "hello world" },
      isSubmitting: false,
      message: "article created",
      response: {
        title: "hello world"
      }
    });
  });

  test("should handle article error ", () => {
    expect(
      reducer({}, { type: ARTICLE_ERROR, payload: { message: "hello world" } })
    ).toEqual({
      isSubmitting: false,
      articleError: {
        message: "hello world"
      }
    });
  });

  test("should handle submitting action ", () => {
    expect(reducer({}, { type: SUBMITTING_ARTICLE })).toEqual({
      isSubmitting: true
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
      article: { title: "hello world" }
    });
  });

  test("should handle article updated successfully ", () => {
    expect(
      reducer(
        {},
        {
          type: ARTICLE_UPDATED,
          payload: {
            message: "Article updated successfully",
            article: {
              title: "hello world"
            }
          }
        }
      )
    ).toEqual({
      response: {
        title: "hello world"
      },
      article: {
        title: "hello world"
      },
      isSubmitting: false,
      message: "Article updated successfully"
    });
  });
});
