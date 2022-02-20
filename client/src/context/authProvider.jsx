import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthState = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("http://localhost:8000/api/guest/", {
        credentials: "include",
      });
      const resJson = await res.json();
      if (resJson.status === "success") {
        setUser({ uid: resJson.user.uid, token: resJson.token });
      } else {
        setUser({ status: "not logged in" });
      }
    };
    fetchUserData();
  }, [setUser]);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
