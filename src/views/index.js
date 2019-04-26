import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
<<<<<<< HEAD
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import UpdatePassword from "./UpdatePassword";
import SocialAuth from "./SocialAuth";
import NewArticle from "./NewArticle";
import EditArticle from "./EditArticle";
import NotFound from "./NotFound";
import ReadArticle from "./ReadArticle";

const Routers = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign_in" component={Login} />
      <Route exact path="/social_auth" component={SocialAuth} />
      <Route exact path="/reset_password" component={ResetPassword} />
      <Route exact path="/update_password" component={UpdatePassword} />
      <Route exact path="/articles/:slug/edit" component={EditArticle} />
      <Route exact path="/articles/new_article" component={NewArticle} />
      <Route exact path="/not_found" component={NotFound} />
      <Route exact path="/articles/:slug" component={ReadArticle} />
    </Switch>
  </Router>
);
export default Routers;
=======
import MainRoutes from "./routes/MainRoutes";
import AuthRoutes from "./routes/AuthRoutes";

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {AuthRoutes.map(route => (
            <Route exact path={route.path} component={route.component} />
          ))}
          <Route exact path="/*" component={MainRoutes} />
        </Switch>
      </Router>
    );
  }
}
>>>>>>> [Chore #163518639] restructure app routers
