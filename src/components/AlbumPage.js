import React, { Component } from "react";
import queryString from "query-string";
import { getAlbum } from "../api/spotifyApi";

class AlbumPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      artists: [],
      release_date: "",
      total_tracks: "",
      tracks: [],
      images: []
    };

    const parsed = queryString.parse(location.search);
    if (parsed.albumId) {
      getAlbum(this.props.accessToken, parsed.albumId).then(data => {
        console.log(data);
        this.setState(() => ({
          name: data.name,
          artists: data.artists,
          release_date: data.release_date,
          total_tracks: data.total_tracks,
          tracks: data.tracks,
          images: data.images
        }));
      });
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.name}</p>
      </div>
    );
  }
}

export default AlbumPage;
