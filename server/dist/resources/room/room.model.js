"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    active_users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    allowed_access: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message" }],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Room", RoomSchema);
