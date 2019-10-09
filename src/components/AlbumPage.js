import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { getAlbum } from "../api/spotifyApi";
import updateBackgroundColor from "../functions/updateBackgroundColor";
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
      images: [],
      backgroundUpdated: false
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

          updateBackgroundColor(data.images[0].url, this.props.background.bgcolor, this.props.setBackgroundColor).then(
            () => {
              if (this._isMounted) {
                this.setState(() => ({
                  backgroundUpdated: true
                }));
              }
            }
          );
        }
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="album-page-wrapper">
        {this.state.backgroundUpdated ? (
          <AlbumDetails 
            albumName={this.state.albumName}
            artists={this.state.artists}
            releaseDate={this.state.release_date}
            totalTracks={this.state.total_tracks}
            tracks={this.state.tracks}
            images={this.state.images} 
          />
        ) : (
          ""
        )}
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
