import allArticlesReducer, {
  initialState
} from "../../redux/reducers/allArticlesReducer";
import {
  FETCHING_ALL_ARTICLES,
  ALL_ARTICLES,
  ALL_ARTICLES_ERROR
} from "../../redux/actionTypes";

const articles = [
  {
    id: "41b90bda-dd41-4b51-abe3-728e6da370bd",
    title: "the beans were eaten by the hens",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    readTime: 1,
    slug: "the-beans-were-eaten-by-the-hens-ichzl1bzwjc",
    createdAt: "2019-05-16T10:31:54.549Z",
    updatedAt: "2019-05-16T10:31:54.549Z",
    userId: "09a0e651-9a25-46d3-8052-c654950a6b28",
    author: {
      following: false,
      username: "musigwa",
      image: null,
      firstName: null,
      lastName: null
    },
    comments: [],
    likes: [],
    bookmarked: false,
    liked: false,
    likesCount: 0,
    tagsList: []
  },
  {
    id: "d1d165dd-0639-431a-8ce0-2595d9f66aad",
    title: "the beans were eaten by the hens",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    readTime: 1,
    slug: "the-beans-were-eaten-by-the-hens-3hjpufi7sx9",
    createdAt: "2019-05-16T10:31:51.827Z",
    updatedAt: "2019-05-16T10:31:51.827Z",
    userId: "09a0e651-9a25-46d3-8052-c654950a6b28",
    author: {
      following: false,
      username: "musigwa",
      image: null,
      firstName: null,
      lastName: null
    },
    comments: [],
    likes: [],
    bookmarked: false,
    liked: false,
    likesCount: 0,
    tagsList: []
  }
];

describe("all articles reducers", () => {
  test("should return initial state", () => {
    expect(allArticlesReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle FETCHING_ALL_ARTICLES", () => {
    expect(
      allArticlesReducer(initialState, { type: FETCHING_ALL_ARTICLES })
    ).toEqual({
      ...initialState,
      isFetching: true
    });
  });

  test("should handle ALL_ARTICLES", () => {
    expect(
      allArticlesReducer(
        { ...initialState },
        {
          type: ALL_ARTICLES,
          payload: articles
        }
      )
    ).toEqual({
      ...initialState,
      allArticles: articles
    });
  });

  test("should handle ALL_ARTICLES_ERROR", () => {
    const errorMessage = "Couldn't find the articles";
    expect(
      allArticlesReducer(initialState, {
        type: ALL_ARTICLES_ERROR,
        payload: errorMessage
      })
    ).toEqual({
      ...initialState,
      payload: errorMessage
    });
  });
});
