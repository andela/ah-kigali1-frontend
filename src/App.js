import "./styles/main.scss";
import React from "react";
import { Provider } from "react-redux";
import jwt from "jsonwebtoken";
import store from "./redux/store";
import Routers from "./views";
import { setCurrentUser } from "./redux/actions/authActions";

if (localStorage.token) {
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}
export default () => (
  <Provider store={store}>
    <Routers />
  </Provider>
);
