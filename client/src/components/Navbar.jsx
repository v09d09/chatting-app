import { Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import useLocalStorage from "../hooks/useLocalStorage";

function Navbar() {
  const [user, setUser] = useAuth();
  const [token, setToken] = useLocalStorage("access_token");
  const logoutHandler = (e) => {
    setUser({ data: null });
    setToken("");
  };
  return (
    <div className=" flex h-20 w-full max-w-6xl items-center justify-between">
      <Link to="/">
        <h1 className="bold text-3xl font-bold text-yellow-400">[SeaCord]</h1>
      </Link>

      {user.data && (
        <div className="flex text-xl">
          <div className="p-3 ">{user.data.username}</div>
          <div
            onClick={logoutHandler}
            className="cursor-pointer p-3 text-lg hover:text-red-400"
          >
            logout
          </div>
        </div>
      )}

      {!user.data && (
        <div className="flex text-xl">
          <Link to="/login" className="p-3 hover:text-orange-200">
            <div>login</div>
          </Link>

          <Link to="/signup" className="p-3  hover:text-orange-200">
            <div>sign up</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
