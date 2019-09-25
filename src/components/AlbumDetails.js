import React, { Component } from "react";

class AlbumDetails extends Component {
  render() {
    return (
      <div className="album-details-wrapper content-spacing">
        <div className="album-details-container">
          {this.props.images[0] ? <img className="album-details-image" src={this.props.images[0].url} /> : ""}
          <p className="album-details-name">{this.props.albumName}</p>
        </div>
      </div>
    );
  }
}

export default AlbumDetails;
