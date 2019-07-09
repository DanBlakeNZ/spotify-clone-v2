import React from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";

let isAuthenticated = true; // TODO: check is logged in here.

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated ? (
        <div>
          <NavBar /> <Component {...props} />{" "}
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;
