import React, { Component } from "react";
import { Link } from "react-router-dom";

class MediaObject extends Component {
  render() {
    return (
      <div className="media-object-container">
        <Link to={this.props.imageLink}>
          <div className="media-object-image-container">
            <div style={{ backgroundImage: `url(${this.props.imageUrl})` }} className="media-object-image"></div>
          </div>
        </Link>
        <Link to={this.props.titleLink}>
          <p className="media-object-title">{this.props.title}</p>
        </Link>
        <Link to={this.props.subtitleLink}>
          <p className="media-object-subtitle">{this.props.subtitle}</p>
        </Link>
      </div>
    );
  }
}

export default MediaObject;
