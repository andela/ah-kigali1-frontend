import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import Navbar from "../../components/common/AppBars/Navbar";
import CreateEditArticle from "../CreateEditHolder";
import ReadArticle from "../ReadArticle";
import NotFound from "../NotFound";
import EditProfile from "../EditProfile";
import Profile from "../Profile";
import Settings from "../Settings";
import Search from "../SearchResults";
import { checkAuthComponent } from "../../utils/checkAuthUtils";

export const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/articles/new",
    component: CreateEditArticle,
    requireAuth: true
  },
  {
    path: "/articles/:slug",
    component: ReadArticle
  },

  {
    path: "/articles/:slug/edit",
    component: CreateEditArticle,
    requireAuth: true
  },
  {
    path: "/profiles/:username",
    component: Profile
  },
  {
    path: "/profiles/:username/edit",
    component: EditProfile
  },
  {
    path: "/settings",
    component: Settings
  },
  {
    path: "/search",
    component: Search
  }
];

export default class MainRoutes extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          {routes.map((route, index) =>
            route.requireAuth ? (
              <Route
                exact
                path={route.path}
                component={checkAuthComponent(route.component)}
                key={Number(index)}
              />
            ) : (
              <Route
                exact
                path={route.path}
                component={route.component}
                key={Number(index)}
              />
            )
          )}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
