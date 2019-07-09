import React, { Component } from "react";

class LoginSuccess extends Component {
  componentDidMount() {
    setTimeout(() => {
      window.close();
    }, 2000);
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
