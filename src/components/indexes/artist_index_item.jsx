import React from "react";

export const ArtistIndexItem = props => {
  return (
    <li className="index-item" onClick={() => props.playArtist(props.artist)}>
      {props.artist.name}
    </li>
  );
};
