import React from "react";
import { SongIndexItem } from "./song_index_item";

export default class SongIndex extends React.Component {
  constructor(props) {
    super(props);
    // Either songs, albums, artists, or playlists will be in down to this as props
  }

  render() {
    const songs =
      this.props &&
      this.props.songs.map((song, i) => {
        return <SongIndexItem key={i} song={song} />;
      });

    return (
      <div>
        <ul>{songs}</ul>
      </div>
    );
  }
}
