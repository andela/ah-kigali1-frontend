import React, { PureComponent } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import Home from "./Home";
import LoginComponent from "./Login";
import Article from "./Article";
import ResetPassword from "./ResetPassword";
import UpdatePassword from "./UpdatePassword";

class MainRouter extends PureComponent {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/login" component={LoginComponent} />
            <Route path="/article" component={Article} />
            <Route exact path="/sign_in" component={LoginComponent} />
            <Route exact path="/reset_password" component={ResetPassword} />
            <Route exact path="/update_password" component={UpdatePassword} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default MainRouter;
