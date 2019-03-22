import React from "react";
import { SongIndexItem } from "./song_index_item";

export default class SongIndex extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const songs =
      this.props &&
      this.props.songs.map((song, i) => {
        return (
          <SongIndexItem key={i} song={song} playSong={this.props.playSong} />
        );
      });

    return (
      <div>
        <ul>{songs}</ul>
      </div>
    );
  }
}
