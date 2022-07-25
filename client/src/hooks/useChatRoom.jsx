import { useEffect, useRef } from "react";
import io from "socket.io-client";
import useLocalStorage from "./useLocalStorage";

// EVENTS
const NEW_MESSAGE_EVENT = "new-message-event";
const JOIN_ROOM_EVENT = "join-room-event";

const useChatRoom = (ns, ch, setMessages) => {
  const [token] = useLocalStorage("access_token");
  const socket = useRef();
  useEffect(() => {
    socket.current = io(ns, {
      auth: { token },
    });

    if (socket.current) {
      console.log("start: ", socket.current.id);
      //join a room based on url?
      joinRoom(ch);
      // listen for incoming message
      socket.current.on(NEW_MESSAGE_EVENT, (message) => {
        setMessages((messages) => [...messages, message]);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("end: ", socket.current.id);
      }
    };
  }, [ch, ns, token, setMessages]);

  // send the messagee along with a sender id. The sender id would allow us to style the UI just like a message app like iOS.
  const sendMessage = (payload) => {
    socket.current.emit(NEW_MESSAGE_EVENT, payload);
  };
  const joinRoom = (room) => {
    socket.current.emit(JOIN_ROOM_EVENT, room);
  };

  return ["_", sendMessage];
};

export default useChatRoom;
