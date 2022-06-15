import { Request, Response } from "express";
import { get } from "lodash";
import {
  createBlog,
  findBlog,
  findAndUpdate,
  deleteBlog,
  findAllBlogs
} from "../service/blog.service";

export async function createBlogHandler(req: Request, res: Response) {

  const userId = get(req, "user._id");
  const body = req.body;

  const blog = await createBlog({ ...body, user: userId });

  // await fileUpload(req,res,blog)

  return res.send(blog);
}

export async function updateBlogHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const blogId = get(req, "params.blogId");
  const update = req.body;

  const blog = await findBlog({ blogId });

  if (!blog) {
    return res.sendStatus(404);
  }

  // if (String(blog.user) !== userId) {
  //   return res.sendStatus(401);
  // }

  const updatedBlog = await findAndUpdate({ blogId }, update, { new: true });

  return res.send(updatedBlog);
}
export async function getBlogHandler(req: Request, res: Response) {
  const blogId = get(req, "params.blogId");
  const blog = await findBlog({ blogId });

  if (!blog) {
    return res.sendStatus(404);
  }

  return res.send(blog);
}

export async function getAllBlogHandler(req: Request, res: Response) {
  const blog = await findAllBlogs(req);
  return res.send(blog);
}

export async function deleteBlogHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const blogId = get(req, "params.blogId");

  const blog = await findBlog({ blogId });

  if (!blog) {
    return res.sendStatus(404);
  }

  // if (String(blog.user) !== String(userId)) {
  //   return res.sendStatus(401);
  // }

  await deleteBlog({ blogId });

  return res.sendStatus(200);
}
