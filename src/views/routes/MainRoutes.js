import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import Navbar from "../../components/common/AppBars/navBar";
import NewArticle from "../NewArticle";
import EditArticle from "../EditArticle";
import ReadArticle from "../ReadArticle";
import NotFound from "../NotFound";

export const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/articles/new",
    component: NewArticle
  },
  {
    path: "/articles/:slug",
    component: ReadArticle
  },
  {
    path: "/articles/:slug/edit",
    component: EditArticle
  },
  {
    path: "/search",
    component: SearchResults
  },
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
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
