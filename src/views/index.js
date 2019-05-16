import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";

export default class Routers extends Component {
  render() {
    const token = localStorage.getItem("token");
    return (
      <Router>
        <Switch>
          {AuthRoutes.map((route, key) =>
            route.path !== "/update_password" ? (
              <Route
                exact
                path={route.path}
                key={Number(key)}
                render={props =>
                  token ? <Redirect to="/" /> : <route.component {...props} />
                }
              />
            ) : (
              <Route
                exact
                path={route.path}
                component={route.component}
                key={Number(key)}
              />
            )
          )}
          <MainRoutes />
        </Switch>
      </Router>
    );
  }
}
