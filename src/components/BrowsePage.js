import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class BrowsePage extends Component {
  render() {
    return (
      <div>
        <p>Welcome {this.props.currentUser.displayName}</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(BrowsePage);
