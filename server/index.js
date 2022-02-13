const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const { addUser, removeUser, getUser } = require("./users");

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

io.on("connection", (socket) => {
  console.log(socket.id + " connected!");

  socket.on("details", (userInfo) => {
    addUser({ ...userInfo, sid: socket.id });
    socket.join(userInfo.room); //??
  });

  socket.on("message", (msg) => {
    console.log(msg);
    const user = getUser(socket.id);
    console.log("GETUSEROUTPUT: ", user);
    if (user) {
      socket.broadcast
        .to(user.room)
        .emit("message", { content: msg, username: user.username });
    } else {
      console.log("Error user not found");
    }
  });
  socket.on("disconnect", (reason) => {
    console.log(reason);
    removeUser(socket.id);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}...`);
});
