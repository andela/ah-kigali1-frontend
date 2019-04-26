import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import Navbar from "../../components/common/AppBars/navBar";

const routes = [
  {
    path: "/",
    component: Home
  }
];
export default class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          {routes.map((route, index) => (
            <Route
              exact
              path={route.path}
              component={route.component}
              key={Number(index)}
            />
          ))}
        </Switch>
      </div>
    );
  }
}
