import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./views/Home";
import Article from "./views/Article";

export default () => (
  <Provider store={store}>
    <Article />
    <Home />
  </Provider>
);
