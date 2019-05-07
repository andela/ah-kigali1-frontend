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

export const articles = [
  {
    id: "76ee9152-eee0-47a7-8a80-3652fe3bf353",
    title: "How to think like a programmer-lessons in problem solving",
    description:
      "“Everyone in this country should learn to program a computer, because it teaches you to think.”-Steve Jobs",
    body:
      "Problem-solving skills are almost unanimously the most important qualification that employers look for….more than programming languages proficiency, debugging, and system desig",
    readTime: 1,
    slug:
      "how-to-think-like-a-programmer-lessons-in-problem-solving-gshblcqj6q8",
    createdAt: "2019-04-23T17:00:52.259Z",
    updatedAt: "2019-04-23T17:00:52.259Z",
    userId: "ceb3cd84-c5c2-4faa-9c4a-bbf1925d13fa",
    author: {
      following: false,
      username: "luc123",
      image: null,
      firstName: null,
      lastName: null
    },
    comments: [],
    likes: [],
    bookmarked: false,
    liked: false,
    likesCount: 0,
    tagsList: ["tech", "mind"]
  },
  {
    id: "2cfaecce-f7c2-4fda-8452-ba183bda662e",
    title: "How to think like a programmer-lessons in problem solving",
    description:
      "“Everyone in this country should learn to program a computer, because it teaches you to think.”-Steve Jobs",
    body:
      "Problem-solving skills are almost unanimously the most important qualification that employers look for….more than programming languages proficiency, debugging, and system desig",
    readTime: 1,
    slug:
      "how-to-think-like-a-programmer-lessons-in-problem-solving-35lnqvrxx61",
    createdAt: "2019-04-23T16:56:07.800Z",
    updatedAt: "2019-04-23T16:56:07.800Z",
    userId: "ceb3cd84-c5c2-4faa-9c4a-bbf1925d13fa",
    author: {
      following: false,
      username: "luc123",
      image: null,
      firstName: null,
      lastName: null
    },
    comments: [],
    likes: [],
    bookmarked: false,
    liked: false,
    likesCount: 0,
    tagsList: ["mind", "tech"]
  },
  {
    id: "a1f2f867-45e7-480c-917d-21fc62f9aecb",
    title: "Come on life",
    description: "Come on jim",
    body:
      "<p>It is a long established fact that a reader will be distracted by the &nbsp;readable content of a page when looking at its layout. The point of &nbsp;using Lorem Ipsum is that it has a more-or-less normal distribution of &nbsp;letters, as opposed to using <u><em><strong>'Content here, content here', making it &nbsp;look like readable English. Many desktop publishing packages and web &nbsp;page editors now use Lorem Ipsum as their default model text, and a &nbsp;search for 'lorem ipsum'</strong></em></u> will uncover many web sites still in their &nbsp;infancy. Various versions have evolved over the years, sometimes by &nbsp;accident, sometimes on purpose (injected humour and the like).</p>",
    readTime: 1,
    slug: "come-on-life-bkj0f5sy35v",
    createdAt: "2019-04-18T09:25:56.681Z",
    updatedAt: "2019-04-18T09:25:56.681Z",
    userId: "ceb3cd84-c5c2-4faa-9c4a-bbf1925d13fa",
    author: {
      following: false,
      username: "luc123",
      image: null,
      firstName: null,
      lastName: null
    },
    comments: [],
    likes: [
      {
        username: "luc123",
        image: null,
        firstName: null,
        lastName: null
      }
    ],
    bookmarked: false,
    liked: true,
    likesCount: 1,
    tagsList: ["hello world"]
  }
];

export const authors = [
  {
    following: false,
    username: "luc123",
    image: null,
    firstName: null,
    lastName: null,
    id: "ceb3cd84-c5c2-4faa-9c4a-bbf1925d13fa"
  }
];
