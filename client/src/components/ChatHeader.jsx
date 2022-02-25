import { useState } from "react";
import ChannelsList from "./ChannelsList";
import UsersList from "./UsersList";

function ChatHeader({ ch }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuHandler = (e) => {
    if (window.screen.width > 1024) return;
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <div
        className=" border-customLightOrange bg-grad absolute top-0 flex h-16 w-full justify-end border-b p-4"
        onClick={menuHandler}
      >
        <h1 className="text-customOrange h-max rounded-full bg-[rgb(0,0,0,0.35)] bg-opacity-30 px-2 text-3xl  italic">
          #{ch}
        </h1>
      </div>
      <div
        className=" absolute top-16 left-0 z-10 mx-1 h-1/2  w-screen   lg:w-0"
        style={{ display: showMenu ? "flex" : "none" }}
      >
        <ChannelsList className="w-1/2 border-b bg-[rgb(0,0,0,0.5)]" />
        <UsersList className="w-1/2 border-b bg-[rgb(0,0,0,0.5)]" />
      </div>
    </>
  );
}

export default ChatHeader;
