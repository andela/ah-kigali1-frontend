import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import Navbar from "../../components/common/AppBars/Navbar";
import NewArticle from "../NewArticle";
import EditArticle from "../EditArticle";
import ReadArticle from "../ReadArticle";
import NotFound from "../NotFound";
import EditProfile from "../EditProfile";
import Profile from "../Profile";
import Settings from "../Settings";
import Search from "../SearchResults";

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
