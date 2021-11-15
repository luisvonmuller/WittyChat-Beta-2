import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./CreateRoom/index";
import Room from "./Room/index";

function App() {
  return (
      <BrowserRouter>   
        <Switch>
          <Route path="/create-room" component={CreateRoom} />
          {
          // TODO: room/${id} - Create the route that receives the uuid and mounts the video room for this single uuid room.
          }
          <Route path="/room" component={Room} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
