import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

import { Container, StyledVideo } from "./styles";

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

function Room(props) {
  const socketRef = useRef();
  const userVideo = useRef();
  const roomID = props.match.params.roomID;
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    async function getMedia(constraints) {
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);

            setPeers([...peers, peer]);
          });
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          setPeers([...peers, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peers.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      } catch (err) {
        /* handle the error */
      }
    }
    socketRef.current = io.connect("localhost:8080");
    getMedia(videoConstraints);
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  let isAudio = true;

  function muteAudio() {
    isAudio = !isAudio;

    userVideo.getAudioTracks()[0].enable = isAudio;
  }

  let isVideo = true;

  function muteVideo() {
    isVideo = !isVideo;

    userVideo.getVideoTracks()[0].enable = isAudio;
  }

  return (
    <Container>
      <h1> ԅ(≖‿≖ԅ) Heres the file....</h1>
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return (
          <>
            <Video key={index} peer={peer} />
          </>
        );
      })}
    </Container>
  );
}

export default Room;
