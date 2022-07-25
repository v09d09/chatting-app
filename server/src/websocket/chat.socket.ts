import { Socket } from "socket.io";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import Token from "../utils/interfaces/token.interface";
import SocketInterface from "./socket.interface";
import { verifyToken } from "../utils/token";
import HttpsException from "../utils/exceptions/http.exception";
import User from "../resources/user/user.model";
import UserType from "../resources/user/user.interface";
import Room from "../resources/room/room.model";
import Message from "../resources/message/message.model";

interface SupaSocket extends Socket {
  user: UserType;
}

const NEW_MESSAGE_EVENT = "new-message-event";
const JOIN_ROOM_EVENT = "join-room-event";

class ChatSocket implements SocketInterface {
  handleConnection(socket: SupaSocket) {
    console.log("user: ", socket.user);
    console.log(socket.user._id.toString());

    if (socket.user) {
      socket.on(JOIN_ROOM_EVENT, async (roomName) => {
        socket.join(roomName);
        console.log(socket.rooms);
        await Room.findOneAndUpdate(
          { name: roomName },
          {
            $push: {
              active_users: socket.user._id,
            },
          }
        );
      });

      socket.on(NEW_MESSAGE_EVENT, async ({ messageBody, roomName }) => {
        console.log(socket.user.username, "@", roomName, ": ", messageBody);
        const room = await Room.findOne({ name: roomName });

        if (!room) {
          throw new Error("room not found");
        }

        // handle socket
        const message = {
          content: messageBody,
          timestamp: Date.now(),
          sender: socket.user.username,
          room: roomName,
        };
        socket.broadcast.to(roomName).emit(NEW_MESSAGE_EVENT, message);

        // handle db
        const payload = await Message.create({
          sender: socket.user._id,
          content: messageBody,
          room: room._id,
        });
        await Room.findByIdAndUpdate(room._id, {
          $push: {
            messages: payload._id,
          },
        });
      });

      socket.on("disconnecting", async () => {
        console.log(socket.user.username, " disconnecting: ", socket.rooms);
        let roomNames: string[] = [];
        socket.rooms.forEach((room) => {
          roomNames.push(room);
        });
        for (let i = 1; i < roomNames.length; ++i) {
          await Room.findOneAndUpdate(
            { name: roomNames[i] },
            {
              $pull: {
                active_users: socket.user._id,
              },
            }
          );
        }
      });
    }
  }

  middlewareImplementation(socket: SupaSocket, next: Function) {
    console.log(socket.id);
    const authMiddleware = async () => {
      const accessToken = socket.handshake.auth.token;
      try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(
          accessToken
        );

        if (payload instanceof jwt.JsonWebTokenError) {
          return next(new HttpsException(401, "Unauthorized"));
        }

        const user = await User.findById(payload.id).select("-password").exec();

        if (!user) {
          return next(new HttpsException(401, "Unauthorized"));
        }
        socket.user = user;
        return next();
      } catch (error) {
        return next(new HttpsException(401, "Unauthorized"));
      }
    };
    authMiddleware();
  }

  // private newMessageHandler = (message) => {
  //   message.timestamp = Date.now();
  //   console.log(message);
  //   socket.broadcast.to("dicks").emit(NEW_MESSAGE_EVENT, message);
  // }
}

export default ChatSocket;

// io.use((socket, next) => {
//   // console.log("connection?", socket);
//   if (!socket.handshake.headers.cookie) {
//     next(new Error("not authed"));
//   }
//   const token = socket.handshake.headers.cookie.substring(6);
//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     User.addUser(new User(user.uid, user.iat, user.exp));
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// io.on("connection", (socket) => {
//   socket.on("joinRoom", ({ uid, channel }) => {
//     let user = User.findUser(uid);
//     let { currSid, prevRoom } = user.setSidToRoom(socket.id, channel);
//     if (prevRoom) {
//       socket.broadcast.to(prevRoom).emit("userLeft", { user });
//       socket.leave(prevRoom);
//     }
//     socket.join(currSid[1]);
//     socket.broadcast.to(currSid[1]).emit("userJoined", { user });
//     socket.emit("userList", User.getAllUsers());
//   });

//   socket.on("message", ({ uid, msg, ch }) => {
//     // const users = User.getAllUsers(); //for debug
//     // const output = Object.keys(users).map(
//     //   (key) => `${users[key].uid}: ${users[key].sidToRoom}`
//     // ); //for debug
//     // console.log(output); //for debug
//     const timestamp = Date.now();
//     const { chatColor } = User.findUser(uid);
//     socket.broadcast
//       .to(ch)
//       .emit("message", { content: msg, uid, timestamp, chatColor });
//   });
//   socket.on("disconnect", (reason) => {
//     const user = User.findUserBySid(socket.id);
//     const sidToRoomArr = user?.getSidToRoom();
//     sidToRoomArr?.forEach((str) => {
//       if (str[0] === socket.id) {
//         socket.broadcast.to(str[1]).emit("userLeft", { user });
//       }
//     });
//     User.deleteSocket(socket.id);
//   });
// });
