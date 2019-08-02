import React from "react";
import Cookies from "js-cookie";
import { Route, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";

const isAuthenticated = () => {
  let { accessToken } = Cookies.get();
  return accessToken;
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuthenticated() ? (
        <div className="app-wrapper">
          <NavBar {...props} /> <Component {...props} />{" "}
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
