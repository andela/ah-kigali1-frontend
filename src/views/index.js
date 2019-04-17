import React, { Component } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import Home from "./Home";
import NotFound from "./Not-Found";
import Login from "./Login";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Navbar from "../components/common/AppBars/navBar";
import Settings from "./Settings";

class MainRoute extends Component {
  render() {
    console.log("ROUTER:",this.props)
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/login" component={Login} />
            <Route path="/profiles" component={Profile} />
            <Route path="/profiles-edit" component={EditProfile} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainRoute;
