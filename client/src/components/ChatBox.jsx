import ChatMsg from "./ChatMsg";
import SendMsgForm from "./SendMsgForm";
import { useSocket } from "../context/SocketProvider";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function ChatBox({ ch }) {
  const [username, SetUsername] = useLocalStorage("username");
  const [messages, setMessages] = useState([]);
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected as: ", socket.id);
      });

      socket.emit("details", { username, channel: ch });

      socket.on("message", (msg) => {
        console.log("haha i receive msg", msg);
        setMessages((prev) => [...prev, msg]);
      });
    } else {
      console.log("Error connecting to server.");
    }
  }, [socket, ch, username]);

  return (
    <div className=" bg-white bg-opacity-5 h-screen w-full relative ">
      <div className=" h-12 w-full absolute top-0 p-4 border-b border-slate-500  font-bold text-lg">
        #{ch} - Users
      </div>
      <div className=" absolute top-12 bottom-24 py-4  px-8 overflow-scroll scrollbar-hide">
        {messages.map((msg, idx) => {
          return (
            <ChatMsg key={idx} username={msg.username} message={msg.content} />
          );
        })}
      </div>
      <div className=" absolute  h-24 w-full bottom-0 p-2 border-t border-slate-500 font-bold">
        <SendMsgForm setMessages={setMessages} />
      </div>
    </div>
  );
}

export default ChatBox;
