import ChatMsg from "./ChatMsg";
import SendMsgForm from "./SendMsgForm";
import { useSocket } from "../context/SocketProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authProvider";

function ChatBox({ ch }) {
  const [user] = useAuth();
  const socket = useSocket();
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (socket) {
      // socket.on("connect", () => {
      //   console.log("connected as: ", socket.id);
      // });
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
    <div className=" relative h-screen w-full bg-white bg-opacity-5 ">
      <div className=" absolute top-0 h-12 w-full border-b border-slate-500 p-4  text-lg font-bold">
        #{ch}
      </div>
      <div className=" scrollbar-hide absolute top-12 bottom-24  overflow-scroll py-4 px-8">
        {messages[ch]?.map((msg, idx) => {
          return <ChatMsg key={idx} uid={msg.uid} message={msg.content} />;
        })}
      </div>
      <div className=" absolute  bottom-0 h-24 w-full border-t border-slate-500 p-2 font-bold">
        <SendMsgForm setMessages={setMessages} ch={ch} />
      </div>
    </div>
  );
}

export default ChatBox;
