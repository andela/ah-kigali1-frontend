import React from "react";
import { Provider } from "react-redux";
import "./styles/main.scss";
import store from "./redux/store";
import Home from "./views/Home";
import "./style/main.scss";

export default () => (
  <Provider store={store}>
    <Home />
  </Provider>
);
