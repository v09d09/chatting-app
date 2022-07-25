import { Link } from "react-router-dom";
import ChannelsList from "./ChannelsList";

function ChannelsSideBar(props) {
  return (
    <div className={`border-r border-customLightOrange ${props.className}`}>
      <div className="flex h-24 flex-col items-center justify-evenly">
        <Link to="/">
          <h1 className="bold text-3xl font-bold text-yellow-400">[seaCord]</h1>
        </Link>
        <h2>
          {/* <span className="text-gray-400">made-by: </span>
          <span className="bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text font-bold text-transparent ">
            Mohamed Hekal
          </span> */}
        </h2>
      </div>
      <ChannelsList />
    </div>
  );
}

export default ChannelsSideBar;
