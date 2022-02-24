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
    <div className="py-2 px-8 ">
      <span
        style={{
          color: color || "#e9c3db",
        }}
      >
        {username[0]}
      </span>
      {": "}
      <p className="inline overflow-hidden text-ellipsis">{message}</p>
    </div>
  );
  const lgMessage = (
    <div className=" border-customLightBlue w-full border-y bg-[rgb(0,0,0,0.2)]  py-2 px-8 ">
      <span
        style={{
          color: color || "#e9c3db",
        }}
      >
        {username[0]}
        <span className="text-sm italic">{`#${username[1]}`}</span>
      </span>
      {": "}
      <div className=" flex justify-between">
        <p className="inline overflow-hidden text-ellipsis">{message}</p>
        <div className="flex flex-col items-center text-xs text-gray-400">
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
        background: idx % 2 === 0 ? "tansparent" : "rgb(255,255,255,0.1)",
        borderLeft: `2px solid ${color || "#e9c3db"}`,
      }}
      onClick={expandHandler}
    >
      {isExpanded ? lgMessage : smMessage}
    </div>
  );
}
//
export default React.memo(ChatMsg);
