import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getNewReleases } from "../api/spotifyApi";

class BrowsePage extends Component {
  componentDidMount() {
    getNewReleases(this.props.auth.accessToken, this.props.user.country).then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>
        <p>Welcome {this.props.user.displayName}</p>
        <Link to="/">Home</Link>
        <p>{artists}</p>
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
