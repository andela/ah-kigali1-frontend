import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./views/Home";
import Article from "./views/Article";

window.store = store;

export default () => (
  <Provider store={store}>
    <Article />
    <Home />
  </Provider>
);
