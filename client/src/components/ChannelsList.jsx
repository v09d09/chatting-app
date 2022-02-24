import React from "react";
import ChannelLink from "./ChannelLink";

function ChannelsList({ className }) {
  return (
    <div className={"border-customLightOrange mt-4 border-t pt-2 " + className}>
      <ul>
        <li>
          <ChannelLink to="/ch/general" />
        </li>
        <li>
          <ChannelLink to="/ch/gaming" />
        </li>
        <li>
          <ChannelLink to="/ch/cats" />
        </li>
        <li>
          <ChannelLink to="/ch/dev" />
        </li>
      </ul>
    </div>
  );
}

export default ChannelsList;
