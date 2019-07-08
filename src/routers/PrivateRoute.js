import React from "react";
import { Route, Redirect } from "react-router-dom";

let isAuthenticated = true; // TODO: check is logged in here.

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} component={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)} />
);

export default PrivateRoute;
