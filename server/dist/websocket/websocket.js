"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const corsOptions = {
    origin: process.env.URL || "http://127.0.0.1:5500",
    credentials: true,
};
class Websocket extends socket_io_1.Server {
    constructor(httpServer) {
        super(httpServer, {
            cors: corsOptions,
        });
    }
    static getInstance(httpServer) {
        if (!Websocket.server) {
            Websocket.server = new Websocket(httpServer);
        }
        return Websocket.server;
    }
    initializeHandlers(socketHandlers) {
        socketHandlers.forEach((element) => {
            let namespace = Websocket.server.of(element.path, (socket) => {
                element.handler.handleConnection(socket);
            });
            if (element.handler.middlewareImplementation) {
                namespace.use(element.handler.middlewareImplementation);
            }
        });
    }
}
exports.default = Websocket;
