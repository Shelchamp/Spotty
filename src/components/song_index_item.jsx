import React from "react";

export const SongIndexItem = props => {
  return (
    <li className="index-item" onClick={() => props.playSong(props.song)}>
      {props.song.artists[0].name} - {props.song.name}
    </li>
  );
};
