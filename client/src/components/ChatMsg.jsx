import React from "react";

function ChatMsg() {
  return (
    <div className="w-full text-sm">
      <span className="text-red-500">Username</span>
      {": "}
      <span>some message</span>
    </div>
  );
}

export default ChatMsg;
