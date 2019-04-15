import React from "react";
import { Provider } from "react-redux";
import "./styles/main.scss";
import store from "./redux/store";
// import Login from "./views/Login";
import ResetPassword from "./views/UpdatePassword";

export default () => (
  <Provider store={store}>
    <ResetPassword />
  </Provider>
);
