import ChatBox from "./components/ChatBox";
import ChannelsSideBar from "./components/ChannelsSideBar";
function App() {
  return (
    <div className="flex h-screen ">
      <ChannelsSideBar className="w-80" />
      <ChatBox />
      <div className="w-80"></div>
    </div>
  );
}

export default App;
