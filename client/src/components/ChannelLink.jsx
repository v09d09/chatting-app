import { NavLink } from "react-router-dom";
function ChannelLink({ to }) {
  const activeHandler = (navData) =>
    navData.isActive ? "text-yellow-400" : "";
  return (
    <NavLink to={to} className={activeHandler}>
      <div className="my-2 border-l border-gray-400 p-2 text-xl">
        {to.split("/")[2]}
      </div>
    </NavLink>
  );
}

export default ChannelLink;
