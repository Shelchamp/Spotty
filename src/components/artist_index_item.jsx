import React from "react";

export const ArtistIndexItem = props => {
  return (
    <li className="index-item" onClick={() => props.playTarget(props.artist)}>
      {props.artist.name}
    </li>
  );
};
