import React, { Component } from "react";

const env = process.env.NODE_ENV || "dev";

class LoginPage extends Component {
  render() {
    let loginUrl =
      env === "dev" ? "http://localhost:3000/api/login" : "https://spotify-clone-dblakenz.herokuapp.com/api/login";

    return (
      <div>
        <button>
          <a href={loginUrl}>Please login to begin</a>
        </button>
      </div>
    );
  }
}

export default LoginPage;
