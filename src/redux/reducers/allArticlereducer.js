const initialState = {
  allArticles: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ALL_ARTICLES":
      return {
        ...state,
        allArticles: action.payload
      };
    case "FETCHING_ALL_ARTICLES":
      return {
        ...state,
        isFetching: true
      };
    case "ALL_ARTICLES_ERROR":
      return {
        ...state,
        ...action.payload
      };
    default:
      return {
        ...state
      };
  }
};
