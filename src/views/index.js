import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {AuthRoutes.map((route, key) => (
            <Route
              exact
              path={route.path}
              component={route.component}
              key={Number(key)}
            />
          ))}
          <MainRoutes />
        </Switch>
      </Router>
    );
  }
}
