import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChannelsSideBar from "../components/ChannelsSideBar";
import UserListSideBar from "../components/UserListSideBar";
import { useAuth } from "../context/authProvider";

function Main() {
  const [user] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.uid) {
      navigate("/login", { replace: true });
    }
    if (
      window.location.pathname === "/ch/" ||
      window.location.pathname === "/ch"
    ) {
      navigate("/ch/general");
    }
  }, [user?.uid, navigate]);

  return (
    <div className="bg-customBlue flex h-screen">
      <ChannelsSideBar className="hidden w-80  lg:block " />
      <Outlet />
      <UserListSideBar className="hidden w-80 lg:block" />
    </div>
  );
}

export default Main;
