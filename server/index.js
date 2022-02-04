const express = require("express");
const app = express();
// const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

io.on("connection", (socket) => {
  console.log("yo we got a connection");
  //listen to incoming messages and forward these messages to every one in the room
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}...`);
});
