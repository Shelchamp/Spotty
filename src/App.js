import React, { Component } from "react";
import logo from "./logo.svg";
import "./stylesheets/App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: "" };
    this.setInput = this.setInput.bind(this);
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
        </header>
      </div>
    );
  }
}
