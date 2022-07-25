import "dotenv/config";
import validateEnv from "./utils/validateEnv";
validateEnv();
import App from "./app";
import Websocket from "./websocket/websocket";
import { createServer } from "http";
import UserController from "./resources/user/user.controller";
import ChatSocket from "./websocket/chat.socket";

const corsOptions = {
  origin: process.env.URL || "http://127.0.0.1:5500",
  credentials: true,
};
const app = new App(
  [new UserController()],
  Number(process.env.PORT),
  corsOptions
);
const httpServer = createServer(app.express);
const io = Websocket.getInstance(httpServer);
io.initializeHandlers([{ path: "/ch/pub", handler: new ChatSocket() }]);

httpServer.listen(app.port, () => {
  console.log("App listening on port " + app.port);
});

// // ---------------------------------------------------------------------- handle sigs

// setInterval(
//   () =>
//     server.getConnections((err, connections) =>
//       console.log(`${connections} connections currently open`)
//     ),
//   60000
// );

// process.on("SIGTERM", shutDown);
// process.on("SIGINT", shutDown);

// let connections = [];

// server.on("connection", (connection) => {
//   connections.push(connection);
//   connection.on(
//     "close",
//     () => (connections = connections.filter((curr) => curr !== connection))
//   );
// });

// function shutDown() {
//   console.log("Received kill signal, shutting down gracefully");
//   server.close(() => {
//     console.log("Closed out remaining connections");
//     process.exit(0);
//   });

//   setTimeout(() => {
//     console.error(
//       "Could not close connections in time, forcefully shutting down"
//     );
//     process.exit(1);
//   }, 10000);

//   connections.forEach((curr) => curr.end());
//   setTimeout(() => connections.forEach((curr) => curr.destroy()), 5000);
// }
