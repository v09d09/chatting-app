import { Schema, model } from "mongoose";
import Room from "./room.interface";

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    active_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    allowed_access: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

export default model<Room>("Room", RoomSchema);
