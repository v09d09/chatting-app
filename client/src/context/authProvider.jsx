import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthState = ({ children }) => {
  const [user, setUser] = useState({ data: null, isLoading: true });
  const [token, _] = useLocalStorage("access_token", "");

  useEffect(() => {
    const fetchUserData = async () => {
      let headers;
      if (token)
        headers = {
          Authorization: "Bearer " + token,
        };
      try {
        const res = await fetch("/api/users", {
          headers,
        });
        const resJson = await res.json();
        if (resJson.user) {
          setUser({ data: resJson.user, isLoading: false });
        } else {
          setUser({ data: null, isLoading: false });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [setUser, token]);
  return (
    <AuthContext.Provider value={[user, setUser]}>
      {children}
    </AuthContext.Provider>
  );
};
