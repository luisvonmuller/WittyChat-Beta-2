import React from "react";
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
  function create() {
    const id = uuid();
    // TODO: Implent the route for the actual rout for a single room.
    props.history.push(`/room/${id}`);
  }

  return <button onClick={create}>Create room</button>;
};

export default CreateRoom;
