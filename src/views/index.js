import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import UpdatePassword from "./UpdatePassword";

const Routers = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign_in" component={Login} />
      <Route exact path="/reset_password" component={ResetPassword} />
      <Route exact path="/update_password" component={UpdatePassword} />
    </Switch>
  </Router>
);
export default Routers;
