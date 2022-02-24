import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

function UsersList({ className }) {
  const [userList, setUserList] = useState({});
  const socket = useSocket();
  const ch = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (socket) {
      socket.on("userList", (users) => {
        setUserList({});
        Object.keys(users).forEach((u) => {
          const user = {
            uid: users[u].uid,
            color: users[u].chatColor,
            sidToRoom: users[u].sidToRoom,
          };

          user.sidToRoom.forEach((arr) => {
            const ch = arr[1];
            setUserList((prev) => {
              if (prev[ch]) {
                return { [ch]: [...prev[ch], user] };
              } else if (prev) {
                return { ...prev, [ch]: [user] };
              } else {
                return { [ch]: [user] };
              }
            });
          });
        });
      });
      socket.on("userJoined", ({ user }) => {
        // console.log("userJoined: ", user.uid, user.sidToRoom);
        setUserList((prev) => {
          if (prev[ch]) {
            return { ...prev, [ch]: [...prev[ch], user.uid] };
          } else if (prev) {
            return { ...prev, [ch]: [user.uid] };
          } else {
            return { [ch]: [user.uid] };
          }
        });
      });
      socket.on("userLeft", ({ user }) => {
        // console.log("userLeft: ", user.uid, user.sidToRoom);
        setUserList((prev) => {
          if (prev[ch]) {
            return { ...prev, [ch]: prev[ch].filter((u) => u !== user.uid) };
          } else if (prev) {
            return { ...prev, [ch]: [] };
          } else {
            return { [ch]: [] };
          }
        });
      });
    }
  }, [socket]);

  return (
    <div
      className={
        "border-customLightOrange scrollbar-hide mt-4 max-h-[80vh] overflow-scroll border-t pt-2 " +
        className
      }
    >
      <ul>
        {userList[ch] &&
          userList[ch]?.map(({ uid, color }, idx) => {
            const user = uid?.split("#");
            if (!user) return;
            return (
              <li
                key={idx}
                className="text-md my-1 bg-inherit p-2"
                style={{ borderRight: "1px solid " + color }}
              >
                <span className="font-bold" style={{ color }}>
                  {user?.[0]}
                </span>
                <span
                  className="text-sm italic opacity-95"
                  style={{ color }}
                >{`#${user?.[1]}`}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default UsersList;
