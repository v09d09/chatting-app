import { NavLink } from "react-router-dom";

function ChannelsSideBar(props) {
  return (
    <div className={props.className}>
      <div className="flex flex-col justify-center items-center py-3">
        <h1 className="text-xl bold font-bold">chatting-app</h1>
        <h2>
          <span className="text-gray-400">made-by: </span>
          <span className="bg-gradient-to-r from-purple-400 to-orange-300 bg-clip-text text-transparent font-bold ">
            voodoo
          </span>
        </h2>
      </div>
      <div className="px-4 py-2">
        <ul>
          <li>
            <NavLink to="/ch/general">general</NavLink>
          </li>
          <li>
            <NavLink to="/ch/gaming">gaming</NavLink>
          </li>
          <li>
            <NavLink to="/ch/cats">cats</NavLink>
          </li>
          <li>
            <NavLink to="/ch/dev">dev</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ChannelsSideBar;
