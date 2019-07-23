import React, { Component } from "react";
import { Link } from "react-router-dom";
import SpotifyLogo from "../images/spotify_text_logo.svg";
import NavBarPrimaryLinks from "./NavBarPrimaryLinks";

class NavBar extends Component {
  render() {
    return (
      <div className="navBar-wrapper">
        <nav className="navBar">
          <div className="navBar-header">
            <Link to="/browse" className="navBar-logo-link">
              <SpotifyLogo className="navBar-logo" width={131} height={40} />
            </Link>
          </div>
          <NavBarPrimaryLinks />
        </nav>
      </div>
    );
  }
}

export default NavBar;
