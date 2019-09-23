import React from "react";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";

export const PrivateRoute = ({ component: Component, accessToken, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      accessToken ? (
        <div className="app-wrapper">
          <NavBar {...props} /> <Component {...props} />{" "}
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
