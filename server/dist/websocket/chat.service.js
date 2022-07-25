"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const websocket_1 = __importDefault(require("./websocket"));
class ChatService {
    // public insertOrder(order) {
    //     //save in your database
    //     //send the update to the browser
    //     this.updateSockets(order);
    // }
    updateSockets() {
        const io = websocket_1.default.getInstance();
        io.of("chat").emit("update", { data: [] });
    }
}
exports.default = ChatService;
