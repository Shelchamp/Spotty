import React from "react";
import logo from "./logo.svg";
import "./stylesheets/App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = { input: "", loggedIn: params };

    this.setInput = this.setInput.bind(this);
  }

  getHashParams() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  setInput(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <input
            onChange={this.setInput}
            value={this.state.input}
            type="text"
          />
          <button>
            <a href="http://localhost:1337">Log into Spotify</a>
          </button>
          {/* 
            <div>{this.state.nowPlaying.name}</div>
            <img src={this.state.nowPlaying.image}/>
          */}
        </header>
      </div>
    );
  }
}
