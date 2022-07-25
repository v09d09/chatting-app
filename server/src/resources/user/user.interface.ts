import { Document, Schema } from "mongoose";

export default interface User extends Document {
  _id: Schema.Types.ObjectId;
  email: string;
  username: string;
  password: string;
  connected_sockets: string[];
  rooms: Schema.Types.ObjectId[];
  role: string;
  isValidPassword(password: string): Promise<Error | boolean>;
}
