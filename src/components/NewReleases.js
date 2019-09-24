import React, { Component } from "react";
import { getNewReleases } from "../api/spotifyApi";
import MediaObject from "./MediaObject";

class NewReleases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
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
                imageUrl={album.images[0].url}
                title={album.name}
                subtitle={album.artists[0].name}
                type={album.type}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default NewReleases;
