"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
(0, validateEnv_1.default)();
const app_1 = __importDefault(require("./app"));
const websocket_1 = __importDefault(require("./websocket/websocket"));
const http_1 = require("http");
const user_controller_1 = __importDefault(require("./resources/user/user.controller"));
const chat_socket_1 = __importDefault(require("./websocket/chat.socket"));
const corsOptions = {
    origin: process.env.URL || "http://127.0.0.1:5500",
    credentials: true,
};
const app = new app_1.default([new user_controller_1.default()], Number(process.env.PORT), corsOptions);
const httpServer = (0, http_1.createServer)(app.express);
const io = websocket_1.default.getInstance(httpServer);
io.initializeHandlers([{ path: "/ch/pub", handler: new chat_socket_1.default() }]);
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
