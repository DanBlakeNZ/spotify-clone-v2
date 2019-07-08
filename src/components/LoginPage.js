import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  render() {
    return (
      <div>
        <button>
          <a href="http://localhost:3000/api/login">Please login to begin</a>
        </button>
      </div>
    );
  }
}

export default LoginPage;
