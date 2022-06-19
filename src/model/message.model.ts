import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface MessageDocument extends mongoose.Document {
  user: UserDocument["_id"];
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10)
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required:true},
    email: { type: String, required:true},
    phone: { type: String, required:true},
    service: { type: String, required:true},
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const Message = mongoose.model<MessageDocument>("Message", MessageSchema);

export default Message;
