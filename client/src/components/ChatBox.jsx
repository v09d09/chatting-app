import ChatMsg from "./ChatMsg";
import SendMsgForm from "./SendMsgForm";
// import { useSocket } from "../context/SocketProvider";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authProvider";
import ChatHeader from "./ChatHeader";
import useChatRoom from "../hooks/useChatRoom";

function ChatBox({ ch }) {
  const [user] = useAuth();
  const [messages, setMessages] = useState([]);
  const [_, sendMessage] = useChatRoom("/ch/pub", ch, setMessages);
  console.log(messages);
  // const socket = useSocket();
  // const [messages, setMessages] = useState({});
  const messagesEl = useRef();

  // useEffect(() => {
  //   const newMessageHandler = (event) => {
  //     const { currentTarget: target } = event;
  //     target.scroll({ top: target.scrollHeight });
  //   };
  //   if (messagesEl) {
  //     messagesEl.current.addEventListener("DOMNodeInserted", newMessageHandler);
  //   }
  //   return () => {
  //     if (messagesEl) {
  //       messagesEl.current.removeEventListener(
  //         "DOMNodeInserted",
  //         newMessageHandler
  //       );
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("connect", () => console.log("connected successfully."));
  //     socket.emit("joinRoom", { uid: user?.uid, channel: ch });
  //     socket.on("message", (msg) => {
  //       setMessages((prev) => {
  //         if (prev[ch]) {
  //           return { ...prev, [ch]: [...prev[ch], msg] };
  //         } else if (prev) {
  //           return { ...prev, [ch]: [msg] };
  //         } else {
  //           return { [ch]: [msg] };
  //         }
  //       });
  //     });
  //   } else {
  //     console.log("connecting to ws...");
  //   }
  // }, [socket, ch, user]);
  return (
    <div className=" relative h-screen w-full overflow-hidden border-r border-customLightOrange  bg-customTrans05">
      <ChatHeader ch={ch} />
      <div
        className=" absolute top-16 bottom-24 w-full overflow-scroll  scrollbar-hide "
        ref={messagesEl}
      >
        {messages?.map((messageBody, idx) => {
          return <ChatMsg key={idx} idx={idx} messageBody={messageBody} />;
        })}
      </div>
      <div className=" absolute  bottom-0 h-24 w-full border-t border-customLightOrange p-2 font-bold">
        <SendMsgForm ch={ch} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default ChatBox;
