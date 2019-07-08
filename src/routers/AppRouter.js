import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import BrowsePage from "../components/BrowsePage";
import { PrivateRoute } from "./PrivateRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/browse" component={BrowsePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
