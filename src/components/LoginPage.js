import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { loginAction, logoutAction } from "../actions/authActions";

const env = process.env.NODE_ENV || "development",
  baseurl = env === "development" ? "http://localhost:3000" : "https://spotify-clone-dblakenz.herokuapp.com",
  left = screen.width / 2 - 520 / 2,
  top = screen.height / 2 - 500 / 2;

class LoginPage extends Component {
  render() {
    const handleLogin = () => {
      const win = window.open(baseurl + "/api/login", "_blank", `width=520, height=500, top=${top}, left=${left}`);
      const timer = setInterval(() => {
        if (win.closed) {
          let { refreshToken, accessToken } = Cookies.get();
          let authDetails = {
            accessToken,
            refreshToken,
            isLoggedIn: true
          };
          this.props.login(authDetails);
          clearInterval(timer);
        }
      }, 100);
    };

    const handleLogOut = () => {
      const win = window.open(
        "https://accounts.spotify.com/en/logout",
        "_blank",
        `width=520, height=500, top=${top}, left=${left}`
      );
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      this.props.logout();

      setTimeout(() => {
        win.close();
      }, 3000);
    };

    return (
      <div className="login-page-wrapper">
        <p>
          {this.props.auth.isLoggedIn ? (
            <button onClick={handleLogOut}>Logout</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </p>
        <Link to="/browse">Browse</Link>
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
)(LoginPage);
