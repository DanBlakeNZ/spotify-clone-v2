import React, { Component } from "react";
import HomeIcon from "../images/icon_home.svg";
import SearchIcon from "../images/icon_search.svg";
import LibraryIcon from "../images/icon_library.svg";
import { Link } from "react-router-dom";

const NavBarPrimaryLinks = () => (
  <ul>
    <li className="navBar-group">
      <div className="navBar-item">
        <Link to="/browse" className="navBar-link">
          <div className="navBar-link-text-with-icon-wrapper">
            <div className="navBar-icon-container">
              <HomeIcon className="navBar-icon" width={24} height={24} />
            </div>
            <span className="navBar-link-text">Home</span>
          </div>
        </Link>
      </div>
      <div className="navBar-item">
        <Link to="/search" className="navBar-link">
          <div className="navBar-link-text-with-icon-wrapper">
            <div className="navBar-icon-container">
              <SearchIcon className="navBar-icon" width={24} height={24} />
            </div>
            <span className="navBar-link-text">Search</span>
          </div>
        </Link>
      </div>
      <div className="navBar-item">
        <Link to="/library" className="navBar-link">
          <div className="navBar-link-text-with-icon-wrapper">
            <div className="navBar-icon-container">
              <LibraryIcon className="navBar-icon" width={24} height={24} />
            </div>
            <span className="navBar-link-text">Your Library</span>
          </div>
        </Link>
      </div>
    </li>
  </ul>
);

export default NavBarPrimaryLinks;
