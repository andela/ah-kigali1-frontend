import { Provider } from "react-redux";
import React from "react";
import store from "./redux/store";
import MainRouter from "./views";

const App = () => (
  <Provider store={store}>
    <MainRouter />
  </Provider>
);

export default App;
