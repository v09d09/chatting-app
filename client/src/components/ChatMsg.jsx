import React, { useState } from "react";

function ChatMsg({ uid, message, timestamp, color, idx }) {
  const username = uid?.split("#");
  const [isExpanded, setIsExpanded] = useState(false);
  const dateFromTimestamp = new Date(timestamp);
  const formattedTS = `${dateFromTimestamp.toLocaleDateString()}-${dateFromTimestamp.toLocaleTimeString()}`;
  const expandHandler = (e) => {
    setIsExpanded(!isExpanded);
  };
  const smMessage = (
    <div className="py-1">
      <span
        style={{
          color: color || "red",
        }}
      >
        {username[0]}
      </span>
      {": "}
      <p className="inline overflow-hidden text-ellipsis">{message}</p>
    </div>
  );
  const lgMessage = (
    <div className=" bg-slate-800 p-2">
      <span
        style={{
          color: color || "red",
        }}
      >
        {username[0]}
        <span className="text-sm italic">{`#${username[1]}`}</span>
      </span>
      {": "}
      <div className=" flex justify-between">
        <p className="inline overflow-hidden text-ellipsis">{message}</p>
        <div className="flex flex-col text-xs text-gray-400">
          <span>{formattedTS.split("-")[0]}</span>
          <span>{formattedTS.split("-")[1]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="w-full text-lg"
      style={{
        background: idx % 2 === 0 ? "tansparent" : "rgb(71,107,107,0.08)",
      }}
      onClick={expandHandler}
    >
      {isExpanded ? lgMessage : smMessage}
    </div>
  );
}
//
export default React.memo(ChatMsg);
