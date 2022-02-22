//BUG: message sent multiple times when user refresh..

require("dotenv").config();
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
  origin: "http://localhost:3000",
  credentials: true,
};
const io = new Server(server, {
  cors: corsOptions,
});

const User = require("./models/User");

const authRouter = require("./routes/authRoutes");
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/guest", authRouter);

///////////////////////////////////////////////////socket
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
    if (prevRoom) socket.leave(prevRoom);
    socket.join(currSid[1]);
  });

  socket.on("message", ({ uid, msg, ch }) => {
    socket.broadcast.to(ch).emit("message", { content: msg, uid });
  });
  socket.on("disconnect", (reason) => {
    User.deleteSocket(socket.id);
  });
});

///////////////////////////////////////////////////server listening
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}...`);
});
