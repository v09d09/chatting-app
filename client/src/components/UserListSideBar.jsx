import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";

function UserListSideBar({ className }) {
  const [userList, setUserList] = useState({});
  const socket = useSocket();
  const ch = window.location.pathname.split("/")[2];

  useEffect(() => {
    if (socket) {
      socket.on("userList", (users) => {
        setUserList({});
        Object.keys(users).forEach((u) => {
          const user = users[u];
          user.sidToRoom.forEach((arr) => {
            const ch = arr[1];
            setUserList((prev) => {
              if (prev[ch]) {
                return { [ch]: [...prev[ch], user.uid] };
              } else if (prev) {
                return { ...prev, [ch]: [user.uid] };
              } else {
                return { [ch]: [user.uid] };
              }
            });
          });
        });
      });
      socket.on("userJoined", ({ user }) => {
        console.log("userJoined: ", user.uid, user.sidToRoom);
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
        console.log("userLeft: ", user.uid, user.sidToRoom);
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
    <div className={className}>
      <div className="flex h-24 flex-col items-center justify-end ">
        <h2 className="from-customLightOrange to-customOrange bg-gradient-to-r bg-clip-text text-xl font-bold text-transparent">
          online chatters
        </h2>
      </div>
      <div className="border-customLightOrange scrollbar-hide mt-4 max-h-[80vh] overflow-scroll border-t pt-2">
        <ul>
          {userList[ch] &&
            userList[ch].map((uid, idx) => {
              const user = uid.split("#");
              return (
                <li
                  key={idx}
                  className="border-customLightOrange text-md my-1 border-r bg-inherit p-2"
                >
                  {user[0]}
                  <span className="text-sm italic">{`#${user[1]}`}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default UserListSideBar;
