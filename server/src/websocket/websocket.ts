import { Server, Socket } from "socket.io";
import { Server as httpServer } from "http";

const corsOptions = {
  origin: process.env.URL || "http://127.0.0.1:5500",
  credentials: true,
};

class Websocket extends Server {
  private static server: Websocket;

  constructor(httpServer: httpServer) {
    super(httpServer, {
      cors: corsOptions,
    });
  }

  public static getInstance(httpServer?: httpServer): Websocket {
    if (!Websocket.server) {
      Websocket.server = new Websocket(httpServer!);
    }

    return Websocket.server;
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((element) => {
      let namespace = Websocket.server.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}

export default Websocket;
