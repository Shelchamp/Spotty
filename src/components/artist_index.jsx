import React from "react";
import { ArtistIndexItem } from "./artist_index_item";

export default class ArtistIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const artists =
      this.props &&
      this.props.artists.map((artist, i) => {
        return (
          <ArtistIndexItem
            key={i}
            artist={artist}
            playTarget={this.props.playTarget}
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
