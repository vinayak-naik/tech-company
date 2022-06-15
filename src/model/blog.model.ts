import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface BlogDocument extends mongoose.Document {
  user: UserDocument["_id"];
  title: string;
  tag: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new mongoose.Schema(
  {
    blogId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10)
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required:true},
    tag: { type: String, required:true},
    imageUrl: { type: String, required:true},
    description: { type: String, required:true},
  },
  { timestamps: true }
);

const Blog = mongoose.model<BlogDocument>("Blog", BlogSchema);

export default Blog;
