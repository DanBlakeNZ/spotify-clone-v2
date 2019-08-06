import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchPage extends Component {
  render() {
    return (
      <div>
        <p>SearchPage</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default SearchPage;
