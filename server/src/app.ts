import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import Controller from "./utils/interfaces/controller.interface";
import errorMiddleware from "./middleware/error.middleware";
import Room from "./resources/room/room.model";

// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

class App {
  public express: Application;
  public port: number;
  public corsOptions: { origin: string; credentials: boolean };

  constructor(
    controllers: Controller[],
    port: number,
    corsOptions: { origin: string; credentials: boolean }
  ) {
    this.express = express();
    this.port = port;
    this.corsOptions = corsOptions;

    this.initDBConnection();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandling();
  }
  private initMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors(this.corsOptions));
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cookieParser());
    this.express.use(compression());
  }
  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }
  private initErrorHandling(): void {
    this.express.use(errorMiddleware);
  }
  private initDBConnection(): void {
    const { MONGO_USER, MONGO_PASS, MONGO_PATH } = process.env;
    mongoose.connect(`mongodb://${MONGO_PATH}`); //${MONGO_USER}:${MONGO_PASS}
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("DB connected on port", connection.port);
    });
    connection.on("disconnected", () => {
      console.log("DB disconnected");
    });
    connection.on("open", async () => {
      const rooms = await Room.find();
      if (rooms.length === 0) {
        const pubRooms = ["general", "gaming", "cats", "dev"];
        const initArray = pubRooms.map((room) => {
          return { name: room };
        });
      }
    });
  }

  // public listen(): void {
  //   this.server.listen(this.port, () => {
  //     console.log("App listening on port " + this.port);
  //   });
  // }
}

export default App;
