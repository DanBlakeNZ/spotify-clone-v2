import React, { Component } from "react";

class LoginSuccess extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.close();
    }, 100);
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
