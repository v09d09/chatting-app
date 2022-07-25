import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ChannelsSideBar from "../components/ChannelsSideBar";
import UserListSideBar from "../components/UserListSideBar";
import { useAuth } from "../context/authProvider";

function Main() {
  const [user, _] = useAuth();
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.isLoading) return;
    else {
      console.log("is finished loading", user);
      if (!user.data) {
        navigate("/login", { replace: true });
      }
      if (
        window.location.pathname === "/ch/" ||
        window.location.pathname === "/ch"
      ) {
        navigate("/ch/general");
      }
    }
  }, [navigate, user]);

  return (
    <>
      {user.data && (
        <div className="flex h-screen bg-customBlue">
          <ChannelsSideBar className="hidden w-80  lg:block " />
          <Outlet />
          <UserListSideBar className="hidden w-80 lg:block" />
        </div>
      )}
    </>
  );
}

export default Main;
