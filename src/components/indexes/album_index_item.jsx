import React from "react";

export const AlbumIndexItem = props => {
  return (
    <li className="index-item" onClick={() => props.playAlbum(props.album)}>
      {props.album.name} - {props.album.artists[0].name}
    </li>
  );
};
