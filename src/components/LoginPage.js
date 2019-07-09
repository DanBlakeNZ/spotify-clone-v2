import React, { Component } from "react";
import Cookies from "js-cookie";

const env = process.env.NODE_ENV || "development";
const baseurl = env === "development" ? "http://localhost:3000" : "https://spotify-clone-dblakenz.herokuapp.com";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    let { refreshToken } = Cookies.get();

    if (refreshToken) {
      fetch(baseurl + `/api/refresh_token?refreshToken=${refreshToken}`)
        .then(response => response.json())
        .then(data => {
          this.setState({
            accessToken: data.access_token,
            refreshToken: refreshToken,
            isLoggedIn: true
          });
        });
    }
  }

  render() {
    const handleLogin = () => {
      window.open(baseurl + "/api/login", "_blank", "width=520, height=500");
    };

    const handleLogOut = () => {
      var win = window.open("https://accounts.spotify.com/en/logout", "_blank", "width=520, height=500");
      Cookies.set("refreshToken", "");
      Cookies.set("accessToken", "");
      this.setState({
        accessToken: null,
        refreshToken: null,
        isLoggedIn: false
      });
      setTimeout(() => {
        win.close();
      }, 2000);
    };

    return (
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleLogOut}>Logout</button>
        <p>{this.state.isLoggedIn ? "Logged In" : "LoggedOut"}</p>
      </div>
    );
  }
}

export default LoginPage;
