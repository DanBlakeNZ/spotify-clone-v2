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
import LoadingPage from "../components/LoadingPage";

export const history = createBrowserHistory();

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    let { refreshToken, accessToken } = Cookies.get();
    const setLogin = (accessToken, refreshToken) => {
      let authDetails = {
        accessToken,
        refreshToken,
        isLoggedIn: accessToken ? true : false
      };
      this.props.login(authDetails);
      this.setState(() => ({ loading: false }));
    };

    if (refreshToken && !accessToken) {
      refreshLogin(refreshToken).then(auth => {
        setLogin(auth.accessToken, auth.refreshToken);
      });
    } else if (refreshToken && accessToken) {
      setLogin(accessToken, refreshToken);
    } else {
      this.setState(() => ({ loading: false }));
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
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
        )}
      </div>
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
