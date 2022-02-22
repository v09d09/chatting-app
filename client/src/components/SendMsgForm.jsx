import React, { useState } from "react";
import { useAuth } from "../context/authProvider";
import { useSocket } from "../context/SocketProvider";

function SendMsgForm({ setMessages, ch }) {
  const socket = useSocket();
  const [user] = useAuth();
  const [message, setMessage] = useState("");

  const sendMsgHandler = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("message", { uid: user?.uid, msg: message, ch });
    } else {
      console.log("Error connecting to server.");
    }
    setMessages((prev) => {
      if (prev[ch]) {
        return {
          ...prev,
          [ch]: [...prev[ch], { uid: user?.uid, content: message }],
        };
      } else if (prev) {
        return { ...prev, [ch]: [{ uid: user?.uid, content: message }] };
      } else {
        return { [ch]: [{ uid: user?.uid, content: message }] };
      }
    });

    setMessage("");
  };

  return (
    <div className="h-full w-full">
      <form
        className="flex h-full w-full items-center justify-center"
        onSubmit={sendMsgHandler}
      >
        <input
          type="text"
          placeholder="Send a Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="h-3/5 w-4/5  border bg-transparent px-4"
        />
        <input
          type="submit"
          value="enter"
          className="mx-2 border bg-white bg-opacity-20 p-3"
        />
      </form>
    </div>
  );
}

export default SendMsgForm;
