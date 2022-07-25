import { useRef, useState, useEffect } from "react";
import Picker from "emoji-picker-react";
import { useAuth } from "../context/authProvider";
import useChatRoom from "../hooks/useChatRoom";
// import { useSocket } from "../context/SocketProvider";

function SendMsgForm({ ch, sendMessage }) {
  const [user] = useAuth();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const sendMsgHandler = (e) => {
    e.preventDefault();
    if (!message) return;

    sendMessage({ messageBody: message, roomName: ch });
    setMessage("");
  };

  const emojiHandler = (e, { emoji }) => {
    setMessage((prev) => prev + ` ${emoji} `);
  };
  const showEmojiHandler = (e) => {
    setShowEmojiPicker((prev) => !prev);
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
          className="h-3/5 w-4/5 border border-r-0 border-customLightOrange bg-customTrans1 px-4 outline-none focus:border focus:border-r-0 focus:border-customLightBlue focus:bg-customTrans05"
        />
        <input
          type="button"
          value="😀"
          onClick={showEmojiHandler}
          className="h-3/5  border  border-x-0 border-customLightOrange bg-customTrans1 px-4 outline-none "
        />
        <div className="relative">
          {showEmojiPicker && (
            <Picker
              onEmojiClick={emojiHandler}
              disableSearchBar={true}
              preload={true}
              className="bg-black"
              pickerStyle={{
                position: "absolute",
                bottom: "20px",
                right: "0",
                boxShadow: "none",
                border: "none",
              }}
            />
          )}
        </div>
        <input
          type="submit"
          value="enter"
          className=" h-3/5 w-1/5 border border-l-0 border-customLightOrange bg-customLightBlue bg-opacity-20 text-xl text-customLightOrange hover:bg-customBlue lg:px-4 "
        />
      </form>
    </div>
  );
}

export default SendMsgForm;
