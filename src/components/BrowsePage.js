import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewReleases from "./NewReleases";

class BrowsePage extends Component {
  render() {
    return (
      <div>
        <p>Welcome {this.props.user.displayName}</p>
        <NewReleases accessToken={this.props.auth.accessToken} country={this.props.user.country} />
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(BrowsePage);
