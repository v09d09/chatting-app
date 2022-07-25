"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = require("../utils/token");
const http_exception_1 = __importDefault(require("../utils/exceptions/http.exception"));
const user_model_1 = __importDefault(require("../resources/user/user.model"));
const room_model_1 = __importDefault(require("../resources/room/room.model"));
const message_model_1 = __importDefault(require("../resources/message/message.model"));
const NEW_MESSAGE_EVENT = "new-message-event";
const JOIN_ROOM_EVENT = "join-room-event";
class ChatSocket {
    handleConnection(socket) {
        console.log("user: ", socket.user);
        console.log(socket.user._id.toString());
        if (socket.user) {
            socket.on(JOIN_ROOM_EVENT, (roomName) => __awaiter(this, void 0, void 0, function* () {
                socket.join(roomName);
                console.log(socket.rooms);
                yield room_model_1.default.findOneAndUpdate({ name: roomName }, {
                    $push: {
                        active_users: socket.user._id,
                    },
                });
            }));
            socket.on(NEW_MESSAGE_EVENT, ({ messageBody, roomName }) => __awaiter(this, void 0, void 0, function* () {
                console.log(socket.user.username, "@", roomName, ": ", messageBody);
                const room = yield room_model_1.default.findOne({ name: roomName });
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
                const payload = yield message_model_1.default.create({
                    sender: socket.user._id,
                    content: messageBody,
                    room: room._id,
                });
                yield room_model_1.default.findByIdAndUpdate(room._id, {
                    $push: {
                        messages: payload._id,
                    },
                });
            }));
            socket.on("disconnecting", () => __awaiter(this, void 0, void 0, function* () {
                console.log(socket.user.username, " disconnecting: ", socket.rooms);
                let roomNames = [];
                socket.rooms.forEach((room) => {
                    roomNames.push(room);
                });
                for (let i = 1; i < roomNames.length; ++i) {
                    yield room_model_1.default.findOneAndUpdate({ name: roomNames[i] }, {
                        $pull: {
                            active_users: socket.user._id,
                        },
                    });
                }
            }));
        }
    }
    middlewareImplementation(socket, next) {
        console.log(socket.id);
        const authMiddleware = () => __awaiter(this, void 0, void 0, function* () {
            const accessToken = socket.handshake.auth.token;
            try {
                const payload = yield (0, token_1.verifyToken)(accessToken);
                if (payload instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    return next(new http_exception_1.default(401, "Unauthorized"));
                }
                const user = yield user_model_1.default.findById(payload.id).select("-password").exec();
                if (!user) {
                    return next(new http_exception_1.default(401, "Unauthorized"));
                }
                socket.user = user;
                return next();
            }
            catch (error) {
                return next(new http_exception_1.default(401, "Unauthorized"));
            }
        });
        authMiddleware();
    }
}
exports.default = ChatSocket;
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
