import { Document, Schema } from "mongoose";
export default interface Room extends Document {
  name: string;
  active_users: Schema.Types.ObjectId[];
  allowed_access: Schema.Types.ObjectId[];
  messages: Schema.Types.ObjectId[];
}
