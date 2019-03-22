import React from "react";
// Components
import ResultTabs from "./components/tabs/result_tabs";
import SongIndex from "./components/indexes/song_index";
import AlbumIndex from "./components/indexes/album_index";
import ArtistIndex from "./components/indexes/artist_index";
import PlaylistIndex from "./components/indexes/playlist_index";

// Stylesheets
import "./stylesheets/App.css";
import "./stylesheets/index_item.css";

// Useful variables and functions
import { SpotURI } from "./helpers/spotify_uri";
// import { playlistID } from "./priv/keys";

import { getQueryParams } from "./helpers/get_query_params"; // Gets tokens from query string
// React logo
import logo from "./logo.svg";

// Access Spotify
import Spotify from "spotify-web-api-js";
const SpotifyWebAPI = new Spotify();

const playlistID = process.env.playlistID || "37i9dQZF1DXcO7NnEyD2nd";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const params = getQueryParams();

    if (params.access_token) {
      SpotifyWebAPI.setAccessToken(params.access_token);
    }

    this.state = {
      input: "",
      isLoggedIn: params.access_token ? true : false,
      data: {
        artists: [],
        songs: [],
        albums: [],
        playlists: []
      },
      widgetInfo: {
        type: "playlist",
        id: playlistID
      }
    };

    this.setInput = this.setInput.bind(this);
    this.searchSong = this.searchSong.bind(this);
    this.playTarget = this.playTarget.bind(this);
  }

  componentDidMount() {
    const input = document.getElementById("input");
    input.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        e.preventDefault();
        const button = document.getElementById("search");
        button.click();
      }
    });
  }

  // For search bar
  setInput(e) {
    this.setState({ input: e.target.value });
  }

  playTarget(target) {
    // SAME CODE WORKS FOR SONGS, ARTISTS, ALBUMS, AND PLAYLISTS
    this.setState({
      widgetInfo: {
        id: target.id,
        type: target.type
      }
    });
  }

  searchSong() {
    SpotifyWebAPI.search(this.state.input, [
      "artist",
      "track",
      "album",
      "playlist"
    ]).then(response => {
      console.log(response);
      const songs = response.tracks.items;
      const albums = response.albums.items;
      const artists = response.artists.items;
      const playlists = response.playlists.items;

      this.setState({
        data: {
          songs: songs,
          albums: albums,
          artists: artists,
          playlists: playlists
        }
      });

      this.setState({
        widgetInfo: {
          type: songs[0].type,
          id: songs[0].id
        }
      });
    });
  }

  render() {
    // Conditional render login button
    let loginButton = !this.state.isLoggedIn ? (
      <button>
        <a href="http://localhost:1337/login">Log into Spotify</a>
      </button>
    ) : (
      <div />
    );

    // Extract data from state
    const data = this.state.data;

    const tabs = [
      {
        title: "Songs",
        results: (
          <SongIndex
            className="songs-index"
            songs={data.songs}
            playSong={this.playTarget}
          />
        )
      },
      {
        title: "Albums",
        results: (
          <AlbumIndex
            className="albums-index"
            albums={data.albums}
            playAlbum={this.playTarget}
          />
        )
      },
      {
        title: "Artists",
        results: (
          <ArtistIndex
            className="artists-index"
            artists={data.artists}
            playArtist={this.playTarget}
          />
        )
      },
      {
        title: "Playlists",
        results: (
          <PlaylistIndex
            className="playlists-index"
            playlists={data.playlists}
            playPlaylist={this.playTarget}
          />
        )
      }
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {loginButton}
          {/*
            
          */}
          <input
            id="input"
            onChange={this.setInput}
            value={this.state.input}
            type="text"
          />
          <button id="search" onClick={this.searchSong}>
            Search by song name
          </button>
          <div id="results-container">
            <ResultTabs tabs={tabs} />
          </div>

          {/*
            
            <ArtistIndex
              className="artists-index"
              artists={data.artists}
              playArtist={this.playTarget}
            />
  
            <SongIndex
              className="songs-index"
              songs={data.songs}
              playSong={this.playTarget}
            />
            <AlbumIndex
              className="albums-index"
              albums={data.albums}
              playAlbum={this.playTarget}
            />
            <PlaylistIndex
              className="playlists-index"
              playlists={data.playlists}
              playPlaylist={this.playTarget}
            />
            
            
            <div>
              Now playing: {this.state.nowPlaying.name} by{" "}
              {this.state.nowPlaying.artist}
            </div>
              
      
              <img src={this.state.nowPlaying.image} style={{ width: 300 }} />
              <button onClick={this.nowPlaying}>What's playing?</button>
          */}
          <iframe
            id="player-widget"
            className="music-player"
            src={`${SpotURI}spotify:${this.state.widgetInfo.type}:${
              this.state.widgetInfo.id
            }`}
            width="300"
            height="380"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          />
        </header>
      </div>
    );
  }
}
