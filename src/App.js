import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./views/Home";
import "./sass/main.scss";

export default () => (
  <Provider store={store}>
    <div className="app-container">
      <Home />
    </div>
  </Provider>
);
