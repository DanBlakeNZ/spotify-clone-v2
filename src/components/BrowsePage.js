import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserProfile } from "../api/spotifyApi";
import { setCurrentUserDetails } from "../actions/currentUserActions";

class BrowsePage extends Component {
  componentDidMount() {
    if (!this.props.currentUser.displayName) {
      getCurrentUserProfile(this.props.auth.accessToken).then(userData => {
        this.props.setCurrentUser(userData);
      });
    }
  }

  render() {
    return (
      <div>
        <p>Welcome {this.props.currentUser.displayName}</p>
        <Link to="/">Home</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentUser: userData => dispatch(setCurrentUserDetails(userData))
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrowsePage);
