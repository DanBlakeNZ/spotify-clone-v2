import React, { Component } from "react";
import { Link } from "react-router-dom";

class YourLibraryPage extends Component {
  render() {
    return (
      <div>
        <p>YourLibraryPage</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default YourLibraryPage;
