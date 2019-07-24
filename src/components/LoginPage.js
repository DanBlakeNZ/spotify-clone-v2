import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const env = process.env.NODE_ENV || "development";
const baseurl = env === "development" ? "http://localhost:3000" : "https://spotify-clone-dblakenz.herokuapp.com";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    let { refreshToken, accessToken } = Cookies.get();
    if (refreshToken && !accessToken) {
      //User has previously logged in but the session has expired, it can be refresh.
      fetch(baseurl + `/api/refresh_token?refreshToken=${refreshToken}`)
        .then(response => response.json())
        .then(data => {
          Cookies.set("accessToken", accessToken, { expires: data.expiresIn / 86400 }); //js-cookie requires value in days - Spotify returns time in milliseconds.
          Cookies.set("refreshToken", data.refreshToken || refreshToken);

          this.setState({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken || refreshToken,
            isLoggedIn: true
          });
        });
    }
  }

  render() {
    const handleLogin = () => {
      let left = screen.width / 2 - 520 / 2,
        top = screen.height / 2 - 500 / 2;
      let win = window.open(baseurl + "/api/login", "_blank", `width=520, height=500, top=${top}, left=${left}`);
      let timer = setInterval(() => {
        if (win.closed) {
          onLoginSuccess();
          clearInterval(timer);
        }
      }, 100);
    };

    const onLoginSuccess = () => {
      let { refreshToken, accessToken } = Cookies.get();
      this.setState({
        accessToken,
        refreshToken,
        isLoggedIn: true
      });
    };

    const handleLogOut = () => {
      let left = screen.width / 2 - 520 / 2,
        top = screen.height / 2 - 500 / 2;
      var win = window.open(
        "https://accounts.spotify.com/en/logout",
        "_blank",
        `width=520, height=500, top=${top}, left=${left}`
      );
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      this.setState({
        accessToken: null,
        refreshToken: null,
        isLoggedIn: false
      });
      setTimeout(() => {
        win.close();
      }, 3000);
    };

    return (
      <div className="login-page-wrapper">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogOut}>Logout</button>
        <p>{this.state.isLoggedIn ? "Logged In" : "Logged Out"}</p>
        <Link to="/browse">Browse</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  let testValue = state.auth;
  return {
    loggedIn: testValue
  };
};

export default connect(mapStateToProps)(LoginPage);
