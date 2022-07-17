require("dotenv").config();
const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const corsOptions = {
  origin: process.env.URL || "http://localhost:3000",
  credentials: true,
};
const io = new Server(server, {
  cors: corsOptions,
});

const User = require("./models/User");

const authRouter = require("./routes/authRoutes");

app.use(express.static(path.join(__dirname, "build")));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/guest", authRouter);

io.use((socket, next) => {
  if (!socket.handshake.headers.cookie) {
    next(new Error("not authed"));
  }
  const token = socket.handshake.headers.cookie.substring(6);
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    User.addUser(new User(user.uid, user.iat, user.exp));
    next();
  } catch (err) {
    next(err);
  }
});

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ uid, channel }) => {
    let user = User.findUser(uid);
    let { currSid, prevRoom } = user.setSidToRoom(socket.id, channel);
    if (prevRoom) {
      socket.broadcast.to(prevRoom).emit("userLeft", { user });
      socket.leave(prevRoom);
    }
    socket.join(currSid[1]);
    socket.broadcast.to(currSid[1]).emit("userJoined", { user });
    socket.emit("userList", User.getAllUsers());
  });

  socket.on("message", ({ uid, msg, ch }) => {
    // const users = User.getAllUsers(); //for debug
    // const output = Object.keys(users).map(
    //   (key) => `${users[key].uid}: ${users[key].sidToRoom}`
    // ); //for debug
    // console.log(output); //for debug
    const timestamp = Date.now();
    const { chatColor } = User.findUser(uid);
    socket.broadcast
      .to(ch)
      .emit("message", { content: msg, uid, timestamp, chatColor });
  });
  socket.on("disconnect", (reason) => {
    const user = User.findUserBySid(socket.id);
    const sidToRoomArr = user?.getSidToRoom();
    sidToRoomArr?.forEach((str) => {
      if (str[0] === socket.id) {
        socket.broadcast.to(str[1]).emit("userLeft", { user });
      }
    });
    User.deleteSocket(socket.id);
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}...`);
});

// ---------------- handle sigs

setInterval(
  () =>
    server.getConnections((err, connections) =>
      console.log(`${connections} connections currently open`)
    ),
  1000
);

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);

let connections = [];

server.on("connection", (connection) => {
  connections.push(connection);
  connection.on(
    "close",
    () => (connections = connections.filter((curr) => curr !== connection))
  );
});

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);

  connections.forEach((curr) => curr.end());
  setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
}
