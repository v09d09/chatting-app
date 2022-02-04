import ChatMsg from "./ChatMsg";
import SendMsgForm from "./SendMsgForm";
import { useSocket } from "../context/SocketProvider";
import { useEffect } from "react";
function ChatBox({ ch }) {
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected to server");
      });
    } else {
      console.log("yo");
    }
  }, [socket]);
  return (
    <div className=" bg-white bg-opacity-5 h-screen w-full relative ">
      <div className=" h-12 w-full absolute top-0 p-4 border-b border-slate-500  font-bold text-lg">
        #{ch} - Users
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
