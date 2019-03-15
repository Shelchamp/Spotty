import React from "react";
// Components
import SongIndex from "./components/song_index";

import "./stylesheets/App.css";
import Spotify from "spotify-web-api-js";
import { SpotURI } from "./helpers/spotify_uri";
import { getHashParams } from "./helpers/get_hash_params"; // Function that gets tokens from query string

import { playlistID } from "./priv/keys";
const SpotifyWebAPI = new Spotify();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const params = getHashParams();

    if (params.access_token) {
      SpotifyWebAPI.setAccessToken(params.access_token);
    }

    this.state = {
      input: "",
      isLoggedIn: params.access_token ? true : false,
      nowPlaying: { artist: "", name: "", image: "" },
      data: {
        artists: [],
        songs: [],
        albums: [],
        playlists: []
      }
    };

    this.setInput = this.setInput.bind(this);
    this.nowPlaying = this.nowPlaying.bind(this);
    this.searchSong = this.searchSong.bind(this);
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

  nowPlaying() {
    SpotifyWebAPI.getMyCurrentPlaybackState().then(response => {
      if (response) {
        this.setState({
          nowPlaying: {
            artist: response.item.artists[0].name,
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        });
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
      if (response.tracks.items !== 0) {
        const song = response.tracks.items[0];
        const artist = song.artists[0].name;
        const name = song.name;
        const image = song.album.images[0].url;
        this.setState({
          nowPlaying: { artist: artist, name: name, image: image }
        });
      }

      this.setState({
        data: {
          songs: songs,
          albums: albums,
          artists: artists,
          playlists: playlists
        }
      });
    });
  }

  setInput(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    // Conditional login button
    let loginButton = !this.state.isLoggedIn ? (
      <button>
        <a href="http://localhost:1337">Log into Spotify</a>
      </button>
    ) : (
      <div />
    );

    const data = this.state.data;

    return (
      <div className="App">
        <header className="App-header">
          {loginButton}
          {/*
          <img src={logo} className="App-logo" alt="logo" />
            
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
          <div>
            Now playing: {this.state.nowPlaying.name} by{" "}
            {this.state.nowPlaying.artist}
          </div>
          <div id="results-container">
            <div>Songs</div>
            <SongIndex className="songs-index" songs={data.songs} />
          </div>

          {/*
              <div>Artists</div>
              <Index className="artists-index" artists={data.artists} />
              <div>Albums</div>
              <Index className="albums-index" albums={data.albums} />
              <div>Playlists</div>
              <Index className="playlists-index" playlists={data.playlists} />
            
          */}
          <img src={this.state.nowPlaying.image} style={{ width: 300 }} />
          <button onClick={this.nowPlaying}>What's playing?</button>
          <iframe
            id="player-widget"
            className="music-player"
            src={`${SpotURI}spotify:playlist:${playlistID}`}
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
