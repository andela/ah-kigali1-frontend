import React from "react";
import { Provider } from "react-redux";
import "./styles/main.scss";
import store from "./redux/store";
import Routers from "./views";

export default () => (
  <Provider store={store}>
    <Routers />
  </Provider>
);
