import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChannelsSideBar from "../components/ChannelsSideBar";
import useLocalStorage from "../hooks/useLocalStorage";

function Main() {
  const [username, setUsername] = useLocalStorage("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/login", { replace: true });
    }
    if (
      window.location.pathname === "/ch/" ||
      window.location.pathname === "/ch"
    ) {
      navigate("/ch/general");
    }
  }, []);

  return (
    <div className="flex h-screen ">
      <ChannelsSideBar className="w-80" />
      <Outlet />
      <div className="w-80"></div>
    </div>
  );
}

export default Main;
