import React from "react";

function ChatMsg({ username, message }) {
  return (
    <div className="w-full text-sm">
      <span className="text-red-500">{username}</span>
      {": "}
      <span>{message}</span>
    </div>
  );
}

export default ChatMsg;
