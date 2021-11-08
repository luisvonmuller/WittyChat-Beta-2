import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import router from "express.router";
import CreateRoom from "CreateRoom";
import Room from "Room";

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
