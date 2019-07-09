import React, { Component } from "react";
import { Link } from "react-router-dom";

class BrowsePage extends Component {
  render() {
    return (
      <div>
        <p>BrowsePage</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default BrowsePage;
