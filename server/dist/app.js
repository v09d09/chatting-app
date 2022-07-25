"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const room_model_1 = __importDefault(require("./resources/room/room.model"));
// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
class App {
    constructor(controllers, port, corsOptions) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.corsOptions = corsOptions;
        this.initDBConnection();
        this.initMiddleware();
        this.initControllers(controllers);
        this.initErrorHandling();
    }
    initMiddleware() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)(this.corsOptions));
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, cookie_parser_1.default)());
        this.express.use((0, compression_1.default)());
    }
    initControllers(controllers) {
        controllers.forEach((controller) => {
            this.express.use("/api", controller.router);
        });
    }
    initErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initDBConnection() {
        const { MONGO_USER, MONGO_PASS, MONGO_PATH } = process.env;
        mongoose_1.default.connect(`mongodb://${MONGO_PATH}`); //${MONGO_USER}:${MONGO_PASS}
        const connection = mongoose_1.default.connection;
        connection.on("connected", () => {
            console.log("DB connected on port", connection.port);
        });
        connection.on("disconnected", () => {
            console.log("DB disconnected");
        });
        connection.on("open", () => __awaiter(this, void 0, void 0, function* () {
            const rooms = yield room_model_1.default.find();
            if (rooms.length === 0) {
                const pubRooms = ["general", "gaming", "cats", "dev"];
                const initArray = pubRooms.map((room) => {
                    return { name: room };
                });
            }
        }));
    }
}
exports.default = App;
