import { useCallback, useEffect, useRef } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket";
import { ACTIONS } from "../actions";
import freeice from "freeice";

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElement = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = socketInit();
  }, []);

  const provideRef = (instance, userId) => {
    audioElement.current[userId] = instance;
  };

  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);

      if (lookingFor === undefined) {
        setClients((existingClients) => [...existingClients, newClient], cb);
      }
    },
    [clients, setClients]
  );

  //Capture media
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() => {
      addNewClient(user, () => {
        const localElement = audioElement.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }

        //Socket emit JOIN socket io
        socket.current.emit(ACTIONS.JOIN, { roomId, user });
      });
    });

    return () => {
      // Leaving room
      if (localMediaStream.current) {
        localMediaStream.current.getTracks().forEach((track) => track.stop());
      }
      socket.current.emit(ACTIONS.LEAVE, {
        roomId,
      });
    };
  }, []);

  useEffect(() => {
    const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
      if (peerId in connections.current) {
        return console.warn(
          `You are already connected with ${peerId} (${user.name})`
        );
      }

      connections.current[peerId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      //Handle new peer
      connections.current[peerId].onicecandidate = (event) => {
        socket.current.emit(ACTIONS.RELAY_ICE, {
          peerId,
          icecandidate: event.candidate,
        });
      };

      //Handle on track on this connection
      connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElement.current[remoteUser.id]) {
            audioElement.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;

            const interval = setInterval(() => {
              if (audioElement.current[remoteUser.id]) {
                audioElement.current[remoteUser.id].srcObject = remoteStream;
              }

              if (settled) {
                clearInterval(interval);
              }
            }, 1000);
          }
        });
      };

      //Add local track to remote connection
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[peerId].addTrack(track, localMediaStream.current);
      });

      //Create offer
      if (createOffer) {
        const offer = await connections.current[peerId].createOffer();
        await connections.current[peerId].setLocalDescription(offer);
        //Send offer to anoter client
        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    };

    socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.current.off(ACTIONS.ADD_PEER);
    };
  }, []);

  //Handle ice candidate
  useEffect(() => {
    socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
      if (icecandidate) {
        connections.current[peerId].addIceCandidate(icecandidate);
      }
    });

    return () => {
      socket.current.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  // Handle SDP
  useEffect(() => {
    const handleRemoteSdp = async ({
      peerId,
      sessionDescription: remoteSessionDescription,
    }) => {
      connections.current[peerId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );

      //if session description is type of offer then create an answer
      if (remoteSessionDescription.type === "offer") {
        const connection = connections.current[peerId];
        const answer = await connection.createAnswer();

        connection.setLocalDescription(answer);

        socket.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: answer,
        });
      }
    };

    socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp);

    return () => {
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  // Handle remove peer
  useEffect(() => {
    const handleRemovePeer = async ({ peerId, userId }) => {
      if (connections.current[peerId]) {
        connections.current[peerId].close();
      }

      delete connections.current[peerId];
      delete audioElement.current[peerId];
      setClients((list) => list.filter((client) => client.id !== userId));
    };

    socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return () => {
      socket.current.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  return { clients, provideRef };
};
