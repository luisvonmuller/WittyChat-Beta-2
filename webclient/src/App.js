import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "CreateRoom";
import Room from "Room";
import express from "express";
var router = express.Router();

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/webclient/src/room/CreateRoom.js"
          exact
          component={CreateRoom}
        />
        <Route path="/webclient/src/room/room.js" exact component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

module.exports = router;
export default App;
