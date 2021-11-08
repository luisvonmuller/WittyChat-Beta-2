import React from "react";
import ReactDOM from "react-dom";
import express from "express";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const router = express.Router();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

module.exports = router;
