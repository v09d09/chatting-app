import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import ChatMsg from "./ChatMsg";
import SendMsgForm from "./SendMsgForm";

function ChatBox() {
  const socket = useRef();
  const SOCKETENDPOINT = "http://localhost:8000";
  useEffect(() => {
    socket.current = io(SOCKETENDPOINT);
  }, []);
  // const colors = ["blue", "purble", "cyan", "pink", "red", "green", "yellow"];
  // // const [idx, setIdx] = useState(0);
  // const [userColor, setUserColor] = useState("");
  // useEffect(() => {
  //   const idx = Math.floor(Math.random() * colors.length);
  //   setUserColor(`text-${colors[idx]}-500`);
  // }, []);
  return (
    <div className=" bg-white bg-opacity-5 h-screen w-full relative ">
      <div className=" h-12 w-full absolute top-0 p-4 border-b border-slate-500  font-bold text-lg">
        #RoomName - Users
      </div>
      <div className=" absolute top-12 bottom-24 py-4  px-8 overflow-scroll scrollbar-hide">
        <ChatMsg />
        <ChatMsg />
      </div>
      <div className=" absolute  h-24 w-full bottom-0 p-2 border-t border-slate-500 font-bold">
        <SendMsgForm />
      </div>
    </div>
  );
}

export default ChatBox;
