import { NavLink } from "react-router-dom";
function ChannelLink({ to }) {
  const activeHandler = (navData) =>
    navData.isActive ? "text-cutsomYellow bg-customTrans2" : "";
  return (
    <NavLink to={to} className={activeHandler} replace={true}>
      <div className="border-customLightOrange my-2 border-l bg-inherit p-2 text-xl">
        {to.split("/")[2]}
      </div>
    </NavLink>
  );
}

export default ChannelLink;
