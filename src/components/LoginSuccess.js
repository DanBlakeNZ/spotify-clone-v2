import React, { Component } from "react";

class LoginSuccess extends Component {
  componentDidMount() {
    window.opener.location.reload(false);
  }
  render() {
    return (
      <div>
        <p>Login successful</p>
      </div>
    );
  }
}

export default LoginSuccess;
