export const article = {
  title: "Hello world",
  tagsList: ["react js"],
  body:
    " ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  description: "Hello world"
};

export const article1 = {
  title: "",
  tagsList: ["react js"],
  body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  description: "Hello world"
};

export const article2 = {
  title: "Hello world",
  description: "",
  tagsList: ["react js"],
  body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
};

export const article3 = {
  title: "Hello world",
  tagsList: ["react js"],
  body: " id est laborum.",
  description: "Hello world"
};
export const props1 = {
  history: {
    push: jest.fn()
  },
  match: {
    params: {
      slug: "hello world"
    }
  },
  asideArticles: [{}],
  article: {
    message: "Article found successfully",
    isFetching: false,
    article: {
      title: "hello world",
      slug: "juventus-vs-manu",
      body: "<p>hello world</p>",
      createdAt: "2019-04-20T09:37:50.006Z",
      readTime: 1,
      author: {
        username: "Yves2019",
        firstName: "Kagarama",
        lastName: "Iraguha"
      },
      likes: [],
      comments: [
        {
          author: {
            username: "Yves2019",
            firstName: "Kagarama",
            lastName: "Iraguha"
          },
          like: 1,
          body: "Hello world",
          id: "hello",
          createdAt: "2019-04-20T09:37:50.006Z"
        }
      ],
      tagsList: ["manchester", "united"]
    }
  },
  fetchOneArticle: jest.fn(),
  deleteOneArticle: jest.fn()
};
export const props2 = {
  history: {
    push: jest.fn()
  },
  match: {
    params: {
      slug: "hello world"
    }
  },
  asideArticles: [],
  article: {
    message: "Article found successfully",
    isFetching: false,
    article: {
      title: "hello world",
      body: "<p>hello world</p>",
      createdAt: "2019-04-20T09:37:50.006Z",
      readTime: 1,
      author: {
        username: "Yves2019",
        firstName: null,
        lastName: null
      },
      likes: [],
      comments: [
        {
          author: {
            username: "Yves2019",
            firstName: null,
            lastName: null
          },
          like: 1,
          body: "Hello world",
          id: "hello",
          createdAt: "2019-04-20T09:37:50.006Z"
        }
      ],
      tagsList: []
    }
  },
  fetchOneArticle: jest.fn(),
  deleteOneArticle: jest.fn()
};
export const props3 = {
  history: {
    push: jest.fn()
  },
  match: {
    params: {
      slug: "hello world"
    }
  },
  asideArticles: [{}],
  article: {
    message: "Article found successfully",
    isFetching: true
  },
  fetchOneArticle: jest.fn(),
  deleteOneArticle: jest.fn(() => "hello world")
};
export const props4 = {
  history: {
    push: jest.fn()
  },
  match: {
    params: {
      slug: "hello world"
    }
  },
  asideArticles: [{}],
  article: {
    message: "Article not found",
    isFetching: true
  },
  fetchOneArticle: jest.fn(),
  deleteOneArticle: jest.fn()
};
export const props5 = {
  history: {
    push: jest.fn()
  },
  match: {
    params: {
      slug: "hello world"
    }
  },
  asideArticles: [],
  article: {
    message: "Article found successfully",
    isFetching: false,
    article: {
      title: "hello world",
      body: "<p>hello world</p>",
      createdAt: "2019-04-20T09:37:50.006Z",
      readTime: 1,
      author: {
        username: "Yves2019",
        firstName: null,
        lastName: null
      },
      likes: [],
      comments: [],
      tagsList: []
    }
  },
  fetchOneArticle: jest.fn(),
  deleteOneArticle: jest.fn()
};

export const mainCardProps1 = {
  history: {
    push: jest.fn()
  },
  article: {
    title: "hello world",
    body: "<p>hello world</p>",
    createdAt: "2019-04-20T09:37:50.006Z",
    readTime: 1,
    author: {
      username: "Yves2019",
      firstName: "Kagarama",
      lastName: "Iraguha"
    },
    likes: [],
    likesCount: 1,
    comments: [
      {
        author: {
          username: "Yves2019",
          firstName: "Kagarama",
          lastName: "Iraguha"
        },
        like: 1,
        body: "Hello world",
        id: 1,
        createdAt: "2019-04-20T09:37:50.006Z"
      }
    ],
    tagsList: ["manchester", "united"]
  }
};
export const mainCardProps2 = {
  history: {
    push: jest.fn()
  },
  article: {
    title: "hello world",
    body: "<p>hello world</p>",
    createdAt: "2019-04-20T09:37:50.006Z",
    readTime: 1,
    author: {
      username: "Yves2019",
      firstName: null,
      lastName: null
    },
    likes: [],
    likesCount: 1,
    comments: [
      {
        author: {
          username: "Yves2019",
          firstName: "Kagarama",
          lastName: "Iraguha"
        },
        like: 1,
        body: "Hello world",
        id: 1,
        createdAt: "2019-04-20T09:37:50.006Z"
      }
    ],
    tagsList: ["manchester", "united"]
  }
};
