import React, { Component } from "react";
import { connect } from "react-redux";
import { getNewReleases } from "../api/spotifyApi";
import updateBackgroundColor from "../functions/updateBackgroundColor";
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
    this._isMounted = true;
    getNewReleases(this.props.accessToken, this.props.country).then(data => {
      if (this._isMounted) {
        this.setState(() => ({ albums: data.albums.items }));
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>
        <p>New Albums and Singles</p>
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
)(NewReleases);
