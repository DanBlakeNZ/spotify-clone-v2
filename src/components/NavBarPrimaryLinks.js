import React, { Component } from "react";
import HomeIcon from "../images/icon_home.svg";
import SearchIcon from "../images/icon_search.svg";
import LibraryIcon from "../images/icon_library.svg";
import { Link } from "react-router-dom";

const NavBarPrimaryLinks = props => (
  <ul>
    {props.items.map(item => (
      <li key={item.name}>
        <div className="navBar-item">
          <Link to={item.url} className="navBar-link">
            <div className="navBar-link-text-with-icon-wrapper">
              <div className="navBar-icon-container">
                {item.name === "Home" ? <HomeIcon /> : item.name === "Search" ? <SearchIcon /> : <LibraryIcon />}
              </div>
              <span className="navBar-link-text">{item.name}</span>
            </div>
          </Link>
        </div>
      </li>
    ))}
  </ul>
);

export default NavBarPrimaryLinks;
