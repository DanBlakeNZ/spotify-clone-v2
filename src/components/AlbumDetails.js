import React, { Component } from "react";
import { split } from "lodash";

class AlbumDetails extends Component {
  render() {
    const { albumName, artists, releaseDate, totalTracks, tracks, images } = this.props;
    const releaseDateArray = split(releaseDate, "-", 3); // Year, Month, Day

    return (
      <div className="album-details-wrapper content-spacing">
        <div className="album-details-container">
          {images[0] ? <img className="album-details-image" src={images[0].url} /> : ""}
          <p className="album-details-name">{albumName}</p>
          {artists.map(artist => {
            return (
              <a key="artist.id" className="album-details-artist">
                {artist.name}
              </a>
            );
          })}
          <button className="btn btn-green">PLAY</button>
          <p className="album-details-year">
            {totalTracks} song{totalTracks > 1 ? "s " : " "} • {releaseDateArray[0]}
          </p>
        </div>
      </div>
    );
  }
}

export default AlbumDetails;
