import React from "react";
import { PlaylistIndexItem } from "./playlist_index_item";

export default class PlaylistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const playlists =
      this.props &&
      this.props.playlists.map((playlist, i) => {
        return (
          <PlaylistIndexItem
            key={i}
            playlist={playlist}
            playPlaylist={this.props.playPlaylist}
          />
        );
      });
    return (
      <div>
        <ul>{playlists}</ul>
      </div>
    );
  }
}
