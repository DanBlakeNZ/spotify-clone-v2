import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import * as Vibrant from "node-vibrant";
import { isEqual, sortBy } from "lodash";
import { getAlbum } from "../api/spotifyApi";
import { setBackgroundColor } from "../actions/backgroundColorActions";
import AlbumDetails from "./AlbumDetails";

class AlbumPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumName: "",
      artists: [],
      release_date: "",
      total_tracks: "",
      tracks: [],
      images: []
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const parsed = queryString.parse(location.search);
    if (parsed.albumId) {
      getAlbum(this.props.accessToken, parsed.albumId).then(data => {
        if (this._isMounted) {
          this.setState(() => ({
            albumName: data.name,
            artists: data.artists,
            release_date: data.release_date,
            total_tracks: data.total_tracks,
            tracks: data.tracks,
            images: data.images
          }));
        }
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.images[0]) {
      Vibrant.from(`${this.state.images[0].url}`)
        .getPalette()
        .then(palette => {
          if (!isEqual(_.sortBy(palette.LightVibrant.rgb), sortBy(this.props.background.bgcolor))) {
            this.props.setBackgroundColor(palette.LightVibrant.rgb);
          }
        });
    }

    return (
      <div className="album-page-wrapper">
        <AlbumDetails images={this.state.images} albumName={this.state.albumName} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBackgroundColor: bgcolor => dispatch(setBackgroundColor(bgcolor))
  };
};

const mapStateToProps = state => {
  return {
    background: state.bgcolor
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumPage);
