import actionTypes from "../actionTypes";

const { ADD_ARTICLE } = actionTypes;
const addArticle = () => async dispatch => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const json = await response.json();
  dispatch({
    type: ADD_ARTICLE,
    payload: json
  });
};

export default addArticle;
