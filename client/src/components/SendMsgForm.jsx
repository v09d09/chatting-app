import React, { useState } from "react";
import { useAuth } from "../context/authProvider";
import { useSocket } from "../context/SocketProvider";

function SendMsgForm({ setMessages }) {
  const socket = useSocket();
  const [user] = useAuth();
  const username = user?.uid?.split("#")[0];
  const [message, setMessage] = useState("");

  const sendMsgHandler = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("message", message);
    } else {
      console.log("Error connecting to server.");
    }
    setMessages((prev) => [...prev, { username, content: message }]);
    setMessage("");
  };

  return (
    <div className="w-full h-full">
      <form
        className="w-full h-full flex justify-center items-center"
        onSubmit={sendMsgHandler}
      >
        <input
          type="text"
          placeholder="Send a Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="bg-transparent border  w-4/5 h-3/5 px-4"
        />
        <input
          type="submit"
          value="enter"
          className="border mx-2 p-3 bg-white bg-opacity-20"
        />
      </form>
    </div>
  );
}

export default SendMsgForm;
