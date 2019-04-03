import actionTypes from "../actionTypes";

const { ADD_ARTICLE } = actionTypes;

const initialState = {
  counter: 0,
  articles: [{ title: "hello world", id: 0, body: "Hello world", userId: 101 }]
};

const rootReducer = (state = initialState, action) => {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      counter: state.counter + 10,
      articles: state.articles.concat(
        action.payload.slice(state.counter + 1, state.counter + 11)
      )
    });
  }
  return state;
};

export default rootReducer;
