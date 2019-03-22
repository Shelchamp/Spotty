import React from "react";

export const PlaylistIndexItem = props => {
  return (
    <li
      className="index-item"
      onClick={() => props.playPlaylist(props.playlist)}
    >
      {props.playlist.name} - {props.playlist.owner.display_name}
    </li>
  );
};
