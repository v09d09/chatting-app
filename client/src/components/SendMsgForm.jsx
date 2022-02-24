import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/authProvider";
import { useSocket } from "../context/SocketProvider";

function SendMsgForm({ setMessages, ch }) {
  const socket = useSocket();
  const [user] = useAuth();
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const sendMsgHandler = (e) => {
    e.preventDefault();
    if (!message) return;
    if (socket) {
      socket.emit("message", { uid: user?.uid, msg: message, ch });
    } else {
      console.log("Error connecting to server.");
    }
    const msg = { uid: user?.uid, content: message, timestamp: Date.now() };
    setMessages((prev) => {
      if (prev[ch]) {
        return {
          ...prev,
          [ch]: [...prev[ch], msg],
        };
      } else if (prev) {
        return { ...prev, [ch]: [msg] };
      } else {
        return { [ch]: [msg] };
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
          ref={inputRef}
          className="bg-customTrans1 focus:bg-customTrans05 border-customLightOrange focus:border-customLightBlue h-3/5 w-4/5 border border-r-0 px-4 outline-none focus:border focus:border-r-0"
        />
        <input
          type="submit"
          value="enter"
          className=" bg-customLightBlue border-customLightOrange text-customLightOrange hover:bg-customBlue h-3/5 w-1/5 border border-l-0 bg-opacity-20 text-xl lg:px-4 "
        />
      </form>
    </div>
  );
}

export default SendMsgForm;
