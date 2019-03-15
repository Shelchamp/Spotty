import React from "react";
import { IndexItem } from "./index_item";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    // Either songs, albums, artists, or playlists will be in down to this as props
  }

  render() {
    return (
      <div>
        <ul>
          <IndexItem />
        </ul>
      </div>
    );
  }
}
