import React from "react";
import { AlbumIndexItem } from "./album_index_item";

export default class AlbumIndex extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const albums =
      this.props &&
      this.props.albums.map((album, i) => {
        return (
          <AlbumIndexItem
            key={i}
            album={album}
            playAlbum={this.props.playAlbum}
          />
        );
      });

    return (
      <div>
        <ul>{albums}</ul>
      </div>
    );
  }
}
