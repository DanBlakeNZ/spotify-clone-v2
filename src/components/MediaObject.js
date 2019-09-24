import React, { Component } from "react";

class MediaObject extends Component {
  render() {
    return (
      <div className="media-object-container">
        <div className="media-object-image-container">
          <div style={{ backgroundImage: `url(${this.props.imageUrl})` }} className="media-object-image"></div>
        </div>
        <p className="media-object-title">{this.props.title}</p>
        <p className="media-object-subtitle">{this.props.subtitle}</p>
      </div>
    );
  }
}

export default MediaObject;
