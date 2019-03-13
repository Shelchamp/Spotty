import React from "react";

export default class Spot extends React.Component {
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
      <div>
        <input onChange={this.setInput} value={this.state.input} type="text" />
      </div>
    );
  }
}
