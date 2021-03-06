import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Stylesheets
import "./stylesheets/index.css";
import "./stylesheets/reset.css";
import "./stylesheets/App.css";
import "./stylesheets/index_item.css";
import "./stylesheets/tab.css"

import * as serviceWorker from "./serviceWorker";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
