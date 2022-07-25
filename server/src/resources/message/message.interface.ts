import { Document, Schema } from "mongoose";
export default interface Message extends Document {
  content: string;
  sender: Schema.Types.ObjectId;
  room: Schema.Types.ObjectId;
}
