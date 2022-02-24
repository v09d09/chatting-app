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
      socket.on("connect", () => console.log("connected successfully."));
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
      console.log("connecting to ws...");
    }
  }, [socket, ch, user]);
  return (
    <div className=" bg-customTrans05 border-customLightOrange relative h-screen w-full border-r ">
      <div className=" border-customLightOrange absolute top-0 flex h-16 w-full justify-end border-b p-4">
        <h1 className="text-customOrange text-2xl font-bold italic">#{ch}</h1>
      </div>
      <div
        className=" scrollbar-hide absolute top-16 bottom-24 w-full  overflow-scroll "
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
      <div className=" border-customLightOrange  absolute bottom-0 h-24 w-full border-t p-2 font-bold">
        <SendMsgForm setMessages={setMessages} ch={ch} />
      </div>
    </div>
  );
}

export default ChatBox;
