import axios from "../../utils/axios";

export const fetchAllArticles = () => async dispatch => {
  try {
    dispatch({ type: "FETCHING_ALL_ARTICLES" });
    const response = await axios.get("/articles");
    dispatch({ type: "ALL_ARTICLES", payload: response.data.articles });
  } catch (error) {
    const { message } = error.response.data;
    dispatch({ type: "ALL_ARTICLES_ERROR", payload: message });
  }
};
