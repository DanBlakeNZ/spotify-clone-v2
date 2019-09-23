import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import Cookies from "js-cookie";

import { PrivateRoute } from "./PrivateRoute";

import LoginSuccess from "../components/LoginSuccess";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import BrowsePage from "../components/BrowsePage";
import SearchPage from "../components/SearchPage";
import YourLibraryPage from "../components/YourLibraryPage";

import { loginAction, logoutAction } from "../actions/authActions";
import { refreshLogin } from "../api/spotifyApi";

export const history = createBrowserHistory();

const env = process.env.NODE_ENV || "development",
  baseurl = env === "development" ? "http://localhost:3000" : "https://spotify-clone-dblakenz.herokuapp.com",
  left = screen.width / 2 - 520 / 2,
  top = screen.height / 2 - 500 / 2;

class AppRouter extends Component {
  componentDidMount() {
    let { refreshToken, accessToken } = Cookies.get();
    const setLogin = (accessToken, refreshToken) => {
      let authDetails = {
        accessToken,
        refreshToken,
        isLoggedIn: accessToken ? true : false
      };
      this.props.login(authDetails);
    };

    if (refreshToken && !accessToken) {
      refreshLogin(refreshToken).then(auth => {
        setLogin(auth.accessToken, auth.refreshToken);
      });
    } else if (refreshToken && accessToken) {
      setLogin(accessToken, refreshToken);
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <div>
            <Switch>
              <Route path="/" component={LoginPage} exact={true} />
              <Route path="/loginsuccess" component={LoginSuccess} />
              <PrivateRoute path="/browse" component={BrowsePage} accessToken={this.props.auth.accessToken} />
              <PrivateRoute path="/search" component={SearchPage} accessToken={this.props.auth.accessToken} />
              <PrivateRoute path="/library" component={YourLibraryPage} accessToken={this.props.auth.accessToken} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: authDetails => dispatch(loginAction(authDetails)),
    logout: () => dispatch(logoutAction())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
