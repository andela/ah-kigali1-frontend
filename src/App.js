import React from "react";
import { Provider } from "react-redux";
import "./styles/main.scss";
import store from "./redux/store";
import MainRouter from "./views";

export default () => (
  <Provider store={store}>
    <MainRouter />
  </Provider>
);
