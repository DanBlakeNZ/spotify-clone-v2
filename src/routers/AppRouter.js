import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import Cookies from "js-cookie";
import { PrivateRoute } from "./PrivateRoute";
import { refreshLogin, getCurrentUserProfile } from "../api/spotifyApi";
import { loginAction } from "../actions/authActions";
import { setCurrentUserDetails } from "../actions/currentUserActions";
import LoginSuccess from "../components/LoginSuccess";
import LoginPage from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import BrowsePage from "../components/BrowsePage";
import SearchPage from "../components/SearchPage";
import YourLibraryPage from "../components/YourLibraryPage";
import LoadingPage from "../components/LoadingPage";
import AlbumPage from "../components/AlbumPage";
import ArtistPage from "../components/ArtistPage";

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

      getCurrentUserProfile(accessToken).then(userData => {
        this.props.setCurrentUser(userData);
        this.setState(() => ({ loading: false }));
      });
    };

    // User's previous session has expired - session can be refreshed.
    // User has a valid session and is logged in.
    // User has no valid session details and needs to login.
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
    let backgroundStyle = {
      background: `linear-gradient(to right bottom, rgba(
        ${this.props.background.bgcolor[0]},
        ${this.props.background.bgcolor[1]},
        ${this.props.background.bgcolor[2]},
        0.7), rgba(0, 0, 0, 0.7)), linear-gradient(transparent, rgba(0, 0, 0, 1) 70%)`
    };

    return (
      <div>
        {this.state.loading ? (
          <LoadingPage />
        ) : (
          <Provider store={this.props.store}>
            <Router history={history}>
              <div className="app-background" style={backgroundStyle}>
                <Switch>
                  <Route path="/" component={LoginPage} exact={true} />
                  <Route path="/loginsuccess" component={LoginSuccess} />
                  <PrivateRoute path="/browse" component={BrowsePage} accessToken={this.props.auth.accessToken} />
                  <PrivateRoute path="/search" component={SearchPage} accessToken={this.props.auth.accessToken} />
                  <PrivateRoute path="/library" component={YourLibraryPage} accessToken={this.props.auth.accessToken} />
                  <PrivateRoute path="/album" component={AlbumPage} accessToken={this.props.auth.accessToken} />
                  <PrivateRoute path="/artist" component={ArtistPage} accessToken={this.props.auth.accessToken} />
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
    setCurrentUser: userData => dispatch(setCurrentUserDetails(userData))
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentUser: state.currentUser,
    background: state.bgcolor
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRouter);
