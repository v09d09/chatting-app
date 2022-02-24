import ChannelLink from "./ChannelLink";

function ChannelsSideBar(props) {
  return (
    <div className={`border-customLightOrange border-r ${props.className}`}>
      <div className="flex h-24 flex-col items-center justify-evenly">
        <h1 className="bold text-3xl font-bold text-fuchsia-200">
          chatting-app
        </h1>
        <h2>
          <span className="text-gray-400">made-by: </span>
          <span className="bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text font-bold text-transparent ">
            Mohamed Hekal
          </span>
        </h2>
      </div>
      <div className="border-customLightOrange mt-4 border-t pt-2">
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
    </div>
  );
}

export default ChannelsSideBar;
