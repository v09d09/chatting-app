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
const { addUser, removeUser, getUser } = require("./users");
const authRouter = require("./routes/authRoutes");
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true })); // might not need
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/guest", authRouter);

///////////////////////////////////////////////socket code
io.use((socket, next) => {
  if (!socket.handshake.headers.cookie) {
    next(new Error("not authed"));
  }
  const token = socket.handshake.headers.cookie.substring(6);
  console.log("trying..");
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user);
    //check for user in USERS here................................................?
    next();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
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
    //check if all that user's sockets list is empty then delete, else delete just this socket's id from their list
    console.log(reason);
    removeUser(socket.id);
  });
});

///////////////////////////////////////////////////server listening
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server up and running on port: ${PORT}...`);
});
