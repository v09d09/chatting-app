import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuth } from "./authProvider";
// const CONNECTION_STRING = "http://localhost:8000";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const [user] = useAuth();

  useEffect(() => {
    const socketOptions = { withCredentials: true };
    const newSocket = io("/", socketOptions);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
