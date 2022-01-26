import ChannelsSideBar from "../components/ChannelsSideBar";
import ChatBox from "../components/ChatBox";

function Main() {
  return (
    <div className="flex h-screen ">
      <ChannelsSideBar className="w-80" />
      <ChatBox />
      <div className="w-80"></div>
    </div>
  );
}

export default Main;
