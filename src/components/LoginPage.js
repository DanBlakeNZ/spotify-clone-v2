import React, { Component } from "react";

const env = process.env.NODE_ENV || "development";
const baseurl = env === "development" ? "http://localhost:3000" : "https://spotify-clone-dblakenz.herokuapp.com";

class LoginPage extends Component {
  render() {
    const handleLogin = () => {
      window.open(baseurl + "/api/login", "_blank", "width=520, height=500");
    };

    return (
      <div>
        <button onClick={handleLogin}>
          <p>Please login to begin</p>
        </button>
      </div>
    );
  }
}

export default LoginPage;
