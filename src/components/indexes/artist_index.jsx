import React from "react";
import { ArtistIndexItem } from "./artist_index_item";

export default class ArtistIndex extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const artists =
      this.props &&
      this.props.artists.map((artist, i) => {
        return (
          <ArtistIndexItem
            key={i}
            artist={artist}
            playArtist={this.props.playArtist}
          />
        );
      });

    return (
      <div>
        <ul>{artists}</ul>
      </div>
    );
  }
}
