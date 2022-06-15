import { Request, Response } from "express";
import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Blog, { BlogDocument } from "../model/blog.model";

export function createBlog(input: DocumentDefinition<BlogDocument>) {
  return Blog.create(input);
}

export function findBlog(
  query: FilterQuery<BlogDocument>,
  options: QueryOptions = { lean: true }
) {
  return Blog.findOne(query, {}, options);
}
export async function findAllBlogs(req: Request) {
  const { limit, skip, search } = req.query;
  const fileLimit = limit?Number(limit):4;
  const fileSkip = skip?Number(skip):0;

  const query = search
    ? { title: { $regex:`(?i)${search}(?-i)`} }
    : {};
  const find = await Blog.find(query);
  let result = await Blog.find(query)
    .limit(fileLimit)
    .skip(fileLimit * fileSkip);
  return { length: find.length, result };
}

export function findAndUpdate(
  query: FilterQuery<BlogDocument>,
  update: UpdateQuery<BlogDocument>,
  options: QueryOptions
) {
  return Blog.findOneAndUpdate(query, update, options);
}

export function deleteBlog(query: FilterQuery<BlogDocument>) {
  return Blog.deleteOne(query);
}
