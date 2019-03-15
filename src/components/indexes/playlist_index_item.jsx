import React from "react";

export const PlaylistIndexItem = props => {
  return (
    <li
      className="index-item"
      onClick={() => props.playPlaylist(props.playlist)}
    >
      {props.playlist.owner.display_name} - {props.playlist.name}
    </li>
  );
};
