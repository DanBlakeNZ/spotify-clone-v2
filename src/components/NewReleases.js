import React, { Component } from "react";
import { getNewReleases } from "../api/spotifyApi";
import MediaObject from "./MediaObject";

class NewReleases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
    // TO-DO: store albums via redux to avoid reloading each time.
  }

  componentDidMount() {
    getNewReleases(this.props.accessToken, this.props.country).then(data => {
      this.setState(() => ({ albums: data.albums.items }));
    });
  }

  render() {
    return (
      <div>
        <p>New Releases</p>
        <div>
          {this.state.albums.map(album => {
            return (
              <MediaObject
                key={album.id}
                type={album.type}
                imageUrl={album.images[0].url}
                imageId={album.id}
                imageLink={`/album?albumId=${album.id}`}
                title={album.name}
                titleId={album.id}
                titleLink={`/album?albumId=${album.id}`}
                subtitle={album.artists[0].name}
                subtitleId={album.artists[0].id}
                subtitleLink={`/artist?artistId=${album.artists[0].id}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default NewReleases;
