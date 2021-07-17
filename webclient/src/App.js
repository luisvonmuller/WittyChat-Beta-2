import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./room/CreateRoom";
import Room from "./room/Room";

function App() {
	return (
	<BrowserRouter>
	<Switch>
	<Route path="/" exact component={CreateRoom} />
	<Route path="/room/:roomID" exact component={Room} />
	</Switch> 
	</BrowserRouter>
)
}


default: App;