import ChatMsg from "./ChatMsg";
import SendMsgForm from "./SendMsgForm";
import { useSocket } from "../context/SocketProvider";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authProvider";

function ChatBox({ ch }) {
  const [user] = useAuth();
  const socket = useSocket();
  const [messages, setMessages] = useState({});
  const messagesEl = useRef();
  useEffect(() => {
    const newMessageHandler = (event) => {
      const { currentTarget: target } = event;
      target.scroll({ top: target.scrollHeight });
    };
    if (messagesEl) {
      messagesEl.current.addEventListener("DOMNodeInserted", newMessageHandler);
    }
    return () => {
      if (messagesEl) {
        messagesEl.current.removeEventListener(
          "DOMNodeInserted",
          newMessageHandler
        );
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", { uid: user?.uid, channel: ch });
      socket.on("message", (msg) => {
        setMessages((prev) => {
          if (prev[ch]) {
            return { ...prev, [ch]: [...prev[ch], msg] };
          } else if (prev) {
            return { ...prev, [ch]: [msg] };
          } else {
            return { [ch]: [msg] };
          }
        });
      });
    } else {
      console.log("Error connecting to server.");
    }
  }, [socket, ch, user]);
  return (
    <div className=" relative h-screen w-full bg-white  bg-opacity-5 ">
      <div className=" absolute top-0 h-16 w-full border-b border-slate-500 p-4  text-2xl font-bold">
        #{ch}
      </div>
      <div
        className=" scrollbar-hide absolute top-16 bottom-24 w-full  overflow-scroll py-4 px-8"
        ref={messagesEl}
      >
        {messages[ch]?.map((msg, idx) => {
          return (
            <ChatMsg
              key={idx}
              idx={idx}
              uid={msg.uid}
              message={msg.content}
              timestamp={msg.timestamp}
              color={msg.chatColor}
            />
          );
        })}
      </div>
      <div className=" absolute  bottom-0 h-24 w-full border-t border-slate-500 p-2 font-bold">
        <SendMsgForm setMessages={setMessages} ch={ch} />
      </div>
    </div>
  );
}

export default ChatBox;
